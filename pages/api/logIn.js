import JWT from 'jsonwebtoken';
import cookie from 'cookie';
import magicServer from '../../lib/magic/server';
import { createUser, isNewUser } from '../../srv/hasura';

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

				if (await isNewUser(token, metaData.issuer)) {
					await createUser(token, metaData);
				};

				const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60;
				const tokenCookie = cookie.serialize('token', token, {
					path: '/',
					secure: process.env.NODE_ENV === 'production',
					maxAge: SEVEN_DAYS_IN_SECONDS,
					expires: new Date(Date.now() + (SEVEN_DAYS_IN_SECONDS * 1000))
				});

				response
					.status(200)
					.setHeader('Set-Cookie', tokenCookie)
					.send('200 OK');
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