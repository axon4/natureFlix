export function parseVideos(videos) {
	return videos.items.map(video => ({imageURL: video.snippet.thumbnails.high.url}));
};