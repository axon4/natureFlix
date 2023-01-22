import JWT from 'jsonwebtoken';

export function getAuthenticatedUser(token) {
	try {
		const deCodedToken = JWT.verify(token, process.env.HASURA_JWT_SECRET);

		return deCodedToken.issuer;
	} catch (error) {
		console.error('Error Getting Authenticated User', error);

		return null;
	};
};