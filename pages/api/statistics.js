import JWT from 'jsonwebtoken';
import { doStatisticsExistForUser, insertStatistics, updateStatistics } from '../../srv/hasura';

async function statistics(request, response) {
	switch (request.method) {
		case 'POST': {
			try {
				const { token } = request.cookies;

				if (!token) {
					response.status(401).send('401 UnAuthorised');
				} else {
					const deCodedToken = JWT.verify(token, process.env.HASURA_JWT_SECRET);
					const { videoID, ...otherStatistics } = request.body;

					if (videoID) {
						if (await doStatisticsExistForUser(token, videoID, deCodedToken.issuer)) {
							const updateResponse = await updateStatistics(token, {
								videoID,
								userID: 'issuer',
								...otherStatistics
							});

							response.status(200).send('200 OK');
						} else {
							const updateResponse = await insertStatistics(token, {
								videoID,
								userID: 'issuer',
								...otherStatistics
							});

							response.status(201).send('201 Created');
						};
					} else {
						response.status(422).send('422 UnProcessable Entity: Missing \'videoID\' Argument');
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