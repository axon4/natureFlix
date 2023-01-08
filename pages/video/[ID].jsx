import { useRouter } from 'next/router';

function VideoPage() {
	const router = useRouter();

	return (
		<main>
			Video Page ID Query: {router.query.ID}
		</main>
	);
};

export default VideoPage;