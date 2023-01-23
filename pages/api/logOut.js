import cookie from 'cookie';
import magicServer from '../../lib/magic/server';

async function logOut(request, response) {
	switch (request.method) {
		case 'POST': {
			try {
				const token = request.headers.authorization?.substr(7);
				
				if (token) {
					try {
						await magicServer.users.logoutByToken(token);
					} catch (error) {
						console.error('Error Logging Out (Server)', error);
					};
				};

				const tokenCookie = cookie.serialize('token', '', {
					path: '/',
					secure: process.env.NODE_ENV === 'production',
					maxAge: -1,
					expires: new Date(Date.now() - 7777777)
				});

				response.writeHead(302, {
					Location: '/logIn',
					'Set-Cookie': tokenCookie
				});
				response.end();
			} catch (error) {
				response.status(500).send(`500 Internal Server Error: ${error.message}`);
			};
		};
		default:
			response.status(422).send('422 UnProcessable Entity: UnHandled \'logIn\' Method');

			break;
	}
};

export default logOut;