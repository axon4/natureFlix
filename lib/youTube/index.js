export function parseVideos(videos) {
	return videos.items.map(video => ({
		ID: video.id.videoId,
		imageURL: video.snippet.thumbnails.high.url
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