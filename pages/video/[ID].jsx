import { useRouter } from 'next/router';
import Modal from 'react-modal';
import styles from '../../styles/VideoPage.module.css';

Modal.setAppElement('#__next');

function VideoPage() {
	const router = useRouter();

	return (
		<main>
			<Modal
				className={styles.modal}
				overlayClassName={styles.overlay}
				isOpen={true}
				onRequestClose={() => {router.back()}}
			>
				<iframe
					className={styles.iFrame}
					src={`https://www.youtube.com/embed/J01qyM3Y9VQ?autoplay=0&controls=0&rel=0&modestbranding=1`}
					type='text/html'
					frameBorder='0'
					width='100%'
					height='360'
				/>
			</Modal>
		</main>
	);
};

export default VideoPage;