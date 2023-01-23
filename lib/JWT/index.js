import { jwtVerify } from 'jose';

export async function getAuthenticatedUser(token) {
	try {
		if (token) {
			const deCodedToken = await jwtVerify(token, new TextEncoder().encode(process.env.HASURA_JWT_SECRET));

			return deCodedToken.payload.issuer;
		} else {
			return null;
		};
	} catch (error) {
		console.error('Error Getting Authenticated User', error);

		return null;
	};
};