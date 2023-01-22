export async function graphQL(token, operation, operationName, variables) {
	try {
		const response = await fetch(process.env.HASURA_GRAPHQL_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// 'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET,
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				query: operation,
				...(operationName && { operationName }),
				...(variables && { variables })
			})
		});
		const data = await response.json();

		if (data.errors) {
			throw new Error(errors);
		};
	
		return data;
	} catch (error) {
		console.error('Error Fetching GraphQL Data:', error);
	};
};

export async function isNewUser(token, issuer) {
	try {
		const operation = `
			query isNewUser($issuer: String!) {
				users(where: {issuer: {_eq: $issuer}}) {
					ID
					eMail
					issuer
				}
			}
		`;

		const response = await graphQL(token, operation, 'isNewUser', { issuer });
		
		return response?.data?.users?.length === 0;
	} catch (error) {
		console.error('Error Determining New User Status:', error);
	};
};

export async function createUser(token, { issuer, publicAddress, email: eMail }) {
	try {
		const operation = `
			mutation createUser($issuer: String!, $publicAddress: String!, $eMail: String!) {
				insert_users(objects: {issuer: $issuer, publicAddress: $publicAddress, eMail: $eMail}) {
					returning {
						ID
						issuer
						eMail
					}
				}
			}
		`;

		const response = await graphQL(token, operation, 'createUser', {
			issuer,
			publicAddress,
			eMail
		});
		
		return response;
	} catch (error) {
		console.error('Error Creating New User:', error);
	};
};

export async function doStatisticsExistForUser(token, videoID, userID) {
	try {
		const operation = `
			query doStatisticsExistForUser($userID: String!, $videoID: String!) {
				statistics(where: {userID: {_eq: $userID}, videoID: {_eq: $videoID }}) {
					ID
					userID
					videoID
					watched
					rating
				}
			}
	  `;
	  
		const response = await graphQL(token, operation, 'doStatisticsExistForUser', {
			videoID,
			userID
		});
	  
		return response?.data?.statistics?.length !== 0;
	} catch (error) {
		console.error('Error Getting Statistics Existence For User:', error);
	};
};

export async function updateStatistics(token, statistics) {
	const operation = `
		mutation updateStatistics($videoID: String!, $userID: String!, $watched: Boolean!, $rating: Int!) {
			update_statistics(
				where: {userID: {_eq: $userID}, videoID: {_eq: $videoID }},
				_set: {watched: $watched, rating: $rating}
			) {
				returning {
					ID
					userID
					videoID
					watched
					rating
				}
			}
		}
	`;

	const response = await graphQL(token, operation, 'updateStatistics', {...statistics});

	return response;
};