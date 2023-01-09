import { parseVideos, parseVideo } from '../../lib/youTube';
import mockVideos from '../../data/videos.json';

export async function getVideos(query, channelID = null) {
	try {
		const queryParameters = {
			key: process.env.YOUTUBE_DATA_API_KEY,
			q: query + 'no music',
			type: 'video',
			part: 'snippet',
			safeSearch: 'strict',
			maxResults: 27
		};

		if (channelID) {
			queryParameters.channelId = channelID;
		};

		const queryArguments = new URLSearchParams(queryParameters);
		const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?${queryArguments}`);
		const data = process.env.MOCK ? mockVideos : await response.json();

		if (data?.error) {
			throw new Error(data.error);
		};

		const videos = parseVideos(data);

		return videos;
	} catch (error) {
		console.error('Error Getting Videos:', error);

		return [];
	};
};

export async function getVideo(ID) {
	try {
		const queryArguments = new URLSearchParams({
			key: process.env.YOUTUBE_DATA_API_KEY,
			id: ID,
			part: 'snippet,contentDetails,statistics'
		});

		const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?${queryArguments}`);
		const data = await response.json();

		if (data?.error) {
			throw new Error(data.error);
		};

		const video = parseVideo(data);

		return video;
	} catch (error) {
		console.error('Error Getting Video:', error);

		return {};
	};
};