import Head from 'next/head';
import Navigation from '../components/navigation/Navigation';
import CardList from '../components/card/CardList';
import { getAuthenticatedUser } from '../lib/JWT';
import { getVideosThatAreDisLiked, getVideosThatAreLiked } from '../srv/youTube';
import styles from '../styles/Ratings.module.css';

export async function getServerSideProps({ req: request }) {
	const { token } = request.cookies;
	const userID = getAuthenticatedUser(token);

	if (!userID) {
		return {
			redirect: {
				destination: '/logIn',
				permanent: false
			}
		};
	};

	const likedVideos = await getVideosThatAreLiked(token, userID);
	const disLikedVideos = await getVideosThatAreDisLiked(token, userID);

	return {
		props: {
			likedVideos,
			disLikedVideos
		}
	};
};

function Ratings({ likedVideos, disLikedVideos }) {
	return (
		<>
			<Head>
				<title>Ratings | NatureFlix</title>
			</Head>
			<main className={styles.main}>
				<header>
					<Navigation />
				</header>
				<section className={styles.section}>
					<CardList title='Likes' size='small' videos={likedVideos} />
					<CardList title='DisLikes' size='small' videos={disLikedVideos} />
				</section>
			</main>
		</>
	);
};

export default Ratings;