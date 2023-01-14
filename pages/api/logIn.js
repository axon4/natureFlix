import JWT from 'jsonwebtoken';
import magicServer from '../../lib/magic/server';
import { isNewUser } from '../../srv/hasura';

async function logIn(request, response) {
	switch (request.method) {
		case 'POST': {
			try {
				const token = request.headers.authorization?.substr(7);
				const metaData = await magicServer.users.getMetadataByToken(token);
				const JWTToken = JWT.sign(
					{
						iat: Math.floor(Date.now() / 1000),
						exp: Math.floor((Date.now() / 1000) + (7 * 24 * 60 * 60)),
						"https://hasura.io/jwt/claims": {
						  "x-hasura-allowed-roles": ["user", "admin"],
						  "x-hasura-default-role": "user",
						  "x-hasura-user-id": `${metadata.issuer}`,
						},
						...metaData
					},
					process.env.HASURA_JWT_SECRET
				);

				const isThisNewUser = await isNewUser(token, metaData.issuer);

				response.status(418).send({ JWTToken, isThisNewUser });
			} catch (error) {
				response.status(500).send('500 Internal Server Error:', error);
			};
		};

			break;

		default:
			response.status(422).send('422 UnProcessable Entity: UnHandled \'logIn\' Method');
	};
};

export default logIn;