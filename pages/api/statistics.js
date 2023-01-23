import { getAuthenticatedUser } from '../../lib/JWT';
import { getStatistics, insertStatistics, updateStatistics } from '../../srv/hasura';


async function statistics(request, response) {
	const { token } = request.cookies;

	switch (request.method) {
		case 'GET': {
			try {
				if (!token) {
					response.status(401).send('401 UnAuthorised');
				} else {
					const userID = await getAuthenticatedUser(token);
					const { videoID } = request.query;

					if (videoID) {
						const statistics = await getStatistics(token, videoID, userID);

						if (statistics.length > 0) {
							response.status(200).json(statistics);
						} else {
							response.status(404).send('404 Not Found: Statistics Not Found');
						};
					} else {
						response.status(422).send('422 UnProcessable Entity: Missing \'videoID\' Query');
					};
				};
			} catch (error) {
				response.status(500).send(`500 Internal Server Error: ${error}`);
			};
		};

			break;
		
		case 'POST': {
			try {
				if (!token) {
					response.status(401).send('401 UnAuthorised');
				} else {
					const userID = await getAuthenticatedUser(token);
					const { videoID, ...otherStatistics } = request.body;

					if (videoID) {
						const statistics = await getStatistics(token, videoID, userID);

						if (statistics.length > 0) {
							await updateStatistics(token, {
								videoID,
								userID,
								...otherStatistics
							});

							response.status(200).send('200 OK');
						} else {
							await insertStatistics(token, {
								videoID,
								userID,
								...otherStatistics
							});

							response.status(201).send('201 Created');
						};
					} else {
						response.status(422).send('422 UnProcessable Entity: Missing \'videoID\' Body Argument');
					};
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