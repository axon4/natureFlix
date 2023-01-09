export async function graphQL(operation, operationName = '', variables = {}) {
	try {
		const response = await fetch(process.env.HASURA_GRAPHQL_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET
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