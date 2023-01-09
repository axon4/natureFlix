import { useRouter } from 'next/router';
import Modal from 'react-modal';
import classNames from 'classnames';
import { getVideo } from '../../srv/youTube';
import styles from '../../styles/VideoPage.module.css';

Modal.setAppElement('#__next');

export async function getStaticProps({ params }) {
	const video = await getVideo(params.ID);

	return {
		props: {...video},
		revalidate: 70
	};
};

export async function getStaticPaths() {
	const bannerVideoIDs = ['J01qyM3Y9VQ'];
	const paths = bannerVideoIDs.map(ID => ({
		params: { ID }
	}));

	return {
		paths,
		fallback: 'blocking'
	};
};

function VideoPage({ title, description, publishTime, channel, views }) {
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
					src={`https://www.youtube.com/embed/${router.query.ID}?autoplay=0&controls=0&rel=0&modestbranding=1`}
					type='text/html'
					frameBorder='0'
					width='100%'
					height='360'
				/>
				<section className={classNames(styles.modalBody, styles.modalBodyContent)}>
					<div className={styles.column1}>
						<h5 className={styles.publishTime}>{publishTime}</h5>
						<hgroup>
							<h1 className={styles.title}>{title}</h1>
							<p className={styles.description}>{description}</p>
						</hgroup>
					</div>
					<div className={styles.column2}>
						<hgroup className={classNames(styles.metaDataWrapper, styles.metaData)}>
							<h5 className={styles.metaDataKey}>Channel:</h5>
							<p className={styles.metaDataValue}>{channel}</p>
						</hgroup>
						<hgroup className={classNames(styles.metaDataWrapper, styles.metaData)}>
							<h5 className={styles.metaDataKey}>Views:</h5>
							<p className={styles.metaDataValue}>{views}</p>
						</hgroup>
					</div>
				</section>
			</Modal>
		</main>
	);
};

export default VideoPage;