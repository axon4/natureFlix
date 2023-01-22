async function statistics(request, response) {
	switch (request.method) {
		case 'POST': {
			try {
				if (!request.cookies.token) {
					response.status(401).send('401 UnAuthorised');
				} else {
					response.status(200).send('200 OK');
				};
			} catch (error) {
				response.status(500).send('500 Internal Server Error', error);
			};
		};

			break;

		default:
			response.status(422).send('422 UnProcessable Entity: UnHandled \'statistics\' Method');

			break;
	};
};

export default statistics;