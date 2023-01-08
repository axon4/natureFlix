export function parseVideos(videos) {
	return videos.items.map(video => ({
		ID: video.id.videoId,
		imageURL: video.snippet.thumbnails.high.url
	}));
};