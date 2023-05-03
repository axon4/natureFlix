import { parseVideos, parseVideo, getThumbNailURL, parsePlayListVideos } from '../../lib/youTube';
import { getDisLikedVideos, getLikedVideos, getWatchedVideos } from '../hasura';
import mockVideos from '../../data/videos.json';

export async function getVideos(query, relatedVideo = null, channelID = null) {
	try {
		if (process.env.MOCK === 'true') {
			return parseVideos(mockVideos);
		};

		const queryArguments = new URLSearchParams({
			key: process.env.YOUTUBE_DATA_API_KEY,
			q: query + ' ' + 'no music',
			...(relatedVideo && {relatedToVideoID: relatedVideo}),
			...(channelID && {channelId: channelID}),
			type: 'video',
			part: 'snippet',
			safeSearch: 'strict',
			maxResults: 27
		});
		const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?${queryArguments}`);
		const data = await response.json();

		if (data?.error) {
			throw new Error(data.error);
		};

		return parseVideos(data);
	} catch (error) {
		console.error('Error Getting Videos:', error);

		return parseVideos(mockVideos);
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

export async function getPlayListVideos(ID) {
	try {
		if (process.env.MOCK === 'true') {
			return parseVideos(mockVideos);
		};

		const queryArguments = new URLSearchParams({
			key: process.env.YOUTUBE_DATA_API_KEY,
			playlistId: ID,
			part: 'snippet',
			maxResults: 27
		});
		const response = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?${queryArguments}`);
		const data = await response.json();

		if (data?.error) {
			throw new Error(data.error);
		};

		return parsePlayListVideos(data);
	} catch (error) {
		console.error('Error Getting Videos:', error);

		return parseVideos(mockVideos);
	};
};

export async function getWatchItAgainVideos(token, userID) {
	const videos = await getWatchedVideos(token, userID);
	const parsedVideos = videos?.map(({ videoID }) => ({
		ID: videoID,
		imageURL: getThumbNailURL(videoID)
	}));

	return parsedVideos;
};

export async function getVideosThatAreLiked(token, userID) {
	const videos = await getLikedVideos(token, userID);
	const parsedVideos = videos?.map(({ videoID }) => ({
		ID: videoID,
		imageURL: getThumbNailURL(videoID)
	}));

	return parsedVideos;
};

export async function getVideosThatAreDisLiked(token, userID) {
	const videos = await getDisLikedVideos(token, userID);
	const parsedVideos = videos?.map(({ videoID }) => ({
		ID: videoID,
		imageURL: getThumbNailURL(videoID)
	}));

	return parsedVideos;
};