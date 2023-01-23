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
				insert_users_one(object: {issuer: $issuer, publicAddress: $publicAddress, eMail: $eMail}) {
					publicAddress
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

export async function getStatistics(token, videoID, userID) {
	try {
		const operation = `
			query getStatistics($userID: String!, $videoID: String!) {
				statistics(where: {userID: {_eq: $userID}, videoID: {_eq: $videoID}}) {
					rating
				}
			}
	  `;
	  
		const response = await graphQL(token, operation, 'getStatistics', {
			videoID,
			userID
		});
	  
		return response?.data?.statistics;
	} catch (error) {
		console.error('Error Getting Statistics For User:', error);
	};
};

export async function insertStatistics(token, statistics) {
	const operation = `
		mutation insertStatistics($videoID: String!, $userID: String!, $watched: Boolean!, $rating: Int!) {
			insert_statistics_one(object: {videoID: $videoID, userID: $userID, watched: $watched, rating: $rating}) {
				videoID
			}
		}
	`;

	const response = await graphQL(token, operation, 'insertStatistics', {...statistics});

	return response;
};

export async function updateStatistics(token, statistics) {
	const operation = `
		mutation updateStatistics($videoID: String!, $userID: String!, $watched: Boolean!, $rating: Int!) {
			update_statistics(
				where: {userID: {_eq: $userID}, videoID: {_eq: $videoID}},
				_set: {watched: $watched, rating: $rating}
			) {
				affected_rows
			}
		}
	`;

	const response = await graphQL(token, operation, 'updateStatistics', {...statistics});

	return response;
};

export async function getWatchedVideos(token, userID) {
	const operation = `
		query getWatchedVideos($userID: String!) {
			statistics(where: {watched: {_eq: true}, userID: {_eq: $userID}}) {
				videoID
			}
		}
	`;

	const response = await graphQL(token, operation, 'getWatchedVideos', { userID });

	return response?.data?.statistics;
};

export async function getLikedVideos(token, userID) {
	const operation = `
		query getLikedVideos($userID: String!) {
			statistics(where: {rating: {_eq: 1}, userID: {_eq: $userID}}) {
				videoID
			}
		}
	`;

	const response = await graphQL(token, operation, 'getLikedVideos', { userID });

	return response?.data?.statistics;
};

export async function getDisLikedVideos(token, userID) {
	const operation = `
		query getDisLikedVideos($userID: String!) {
			statistics(where: {rating: {_eq: 0}, userID: {_eq: $userID}}) {
				videoID
			}
		}
	`;

	const response = await graphQL(token, operation, 'getDisLikedVideos', { userID });

	return response?.data?.statistics;
};