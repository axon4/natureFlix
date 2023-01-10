function logIn(request, response) {
	switch (request.method) {
		case 'POST': {
			try {
				const token = request.headers.authorization?.substr(7);

				response.status(418).send(token);
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