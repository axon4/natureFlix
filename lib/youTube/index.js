export function getThumbNailURL(videoID) {
	return `https://i.ytimg.com/vi/${videoID}/maxresdefault.jpg`;
};

export function parseVideos(videos) {
	return videos.items.map(({ id: { videoId } }) => ({
		ID: videoId,
		imageURL: getThumbNailURL(videoId)
	}));
};

export function parseVideo(video) {
	const { snippet, statistics } = video.items[0];

	return {
		title: snippet.title,
		description: snippet.description,
		publishTime: snippet.publishedAt,
		channel: snippet.channelTitle,
		views: statistics.viewCount
	};
};