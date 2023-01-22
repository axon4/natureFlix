import JWT from 'jsonwebtoken';

async function statistics(request, response) {
	switch (request.method) {
		case 'POST': {
			try {
				const { token } = request.cookies;

				if (!token) {
					response.status(401).send('401 UnAuthorised');
				} else {
					const deCodedToken = JWT.verify(token, process.env.HASURA_JWT_SECRET);

					response.status(200).send('200 OK');
				};
			} catch (error) {
				response.status(500).send(`500 Internal Server Error: ${error}`);
			};
		};

			break;

		default:
			response.status(422).send('422 UnProcessable Entity: UnHandled \'statistics\' Method');

			break;
	};
};

export default statistics;