import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import classNames from 'classnames';
import Navigation from '../../components/navigation/Navigation';
import Like from '../../components/rating/Like';
import DisLike from '../../components/rating/DisLike';
import { getVideo } from '../../srv/youTube';
import styles from '../../styles/Video.module.css';

Modal.setAppElement('#__next');

export async function getStaticProps({ params }) {
	const video = await getVideo(params.ID);

	return {
		props: {...video},
		revalidate: 70
	};
};

export async function getStaticPaths() {
	const bannerVideoIDs = ['xW0cIxVMQJs'];
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
	const [ like, setLike ] = useState(false);
	const [ disLike, setDisLike ] = useState(false);

	const videoID = router.query.ID;

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/statistics?videoID=${videoID}`, {method: 'GET'});

				if (response.status === 200) {
					const data = await response.json();
					const { rating } = data[0];

					rating === 1 ? setLike(true) : setDisLike(true);
				};
			} catch (error) {
				console.error('Error Getting Statistics:', error);
			};
		})();
	}, [videoID]);

	const updateStatistics = async rating => {
		await fetch('/api/statistics', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				videoID,
				watched: true, // TO-DO: find a way to get click event from iFrame instead of hard-coding
				rating
			})
		});
	};

	const onLikeClick = async () => {
		setDisLike(false);
		setLike(true);
		updateStatistics(1);
	};

	const onDisLikeClick = async () => {
		setLike(false);
		setDisLike(true);
		updateStatistics(0);
	};

	return (
		<>
			<Head>
				<title>{title} | NatureFlix</title>
			</Head>
			<main>
				<Navigation />
				<Modal
					className={styles.modal}
					overlayClassName={styles.overlay}
					isOpen={true}
					onRequestClose={() => {router.back()}}
				>
					<iframe
						className={styles.iFrame}
						src={`https://www.youtube.com/embed/${videoID}?autoplay=0&controls=1&rel=0&modestbranding=1`}
						type='text/html'
						frameBorder='0'
						width='100%'
						height='360'
					/>
					<div className={styles.ratingsContainer}>
						<Like filled={like} onClick={onLikeClick} />
						<DisLike filled={disLike} onClick={onDisLikeClick} />
					</div>
					<section className={classNames(styles.modalBody, styles.modalBodyContent)}>
						<div className={styles.column1}>
							<h5 className={styles.publishTime}>{new Date(publishTime).toLocaleString('en-GB')}</h5>
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
		</>
	);
};

export default VideoPage;