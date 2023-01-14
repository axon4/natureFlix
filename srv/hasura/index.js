export async function graphQL(token, operation, operationName = '', variables = {}) {
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
			throw new error(errors);
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