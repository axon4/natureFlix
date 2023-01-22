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
						'https://hasura.io/jwt/claims': {
						  'X-HASURA-ALLOWED-ROLES': ['user', 'admin'],
						  'X-HASURA-DEFAULT-ROLE': 'user',
						  'X-HASURA-USER-ID': `${metaData.issuer}`,
						},
						issuer: metaData.issuer,
						publicAddress: metaData.publicAddress,
						eMail: metaData.email
					},
					process.env.HASURA_JWT_SECRET
				);

				if (await isNewUser(JWTToken, metaData.issuer)) {
					await createUser(JWTToken, metaData);
				};

				const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60;
				const tokenCookie = cookie.serialize('token', JWTToken, {
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
				response.status(500).send(`500 Internal Server Error: ${error.message}`);
			};
		};

			break;

		default:
			response.status(422).send('422 UnProcessable Entity: UnHandled \'logIn\' Method');

			break;
	};
};

export default logIn;