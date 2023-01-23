import Head from 'next/head';
import Navigation from '../components/navigation/Navigation';
import Banner from '../components/banner/Banner';
import CardList from '../components/card/CardList';
import { getAuthenticatedUser } from '../lib/JWT';
import { getVideos, getWatchItAgainVideos } from '../srv/youTube';
import styles from '../styles/Home.module.css';

export async function getServerSideProps({ req: request }) {
	const { token } = request.cookies;
	const userID = await getAuthenticatedUser(token);

	if (!userID) {
		return {
			redirect: {
				destination: '/logIn',
				permanent: false
			}
		};
	};

	const natureVideos = await getVideos('nature');
	const watchedVideos = await getWatchItAgainVideos(token, userID);
	const cookingVideos = await getVideos('cooking', 'UCj4KP216972cPp2w_BAHy8g');
	const animalVideos = await getVideos('animal');
	const oceanVideos = await getVideos('ocean');

	return {
		props: { natureVideos, watchedVideos, cookingVideos, animalVideos, oceanVideos }
	};
};

function Home({ natureVideos, watchedVideos, cookingVideos, animalVideos, oceanVideos }) {
	return (
		<>
			<Head>
				<title>NatureFlix</title>
			</Head>
			<main className={styles.container}>
				<Navigation />
				<Banner title='Toucan' subTitle='Brazilian, Channel-Billed' imageURL='/toucan.jpg' videoID='xW0cIxVMQJs' />
				<CardList title='Nature' size='large' videos={natureVideos} />
				<CardList title='Watch Again' size='small' videos={watchedVideos} />
				<CardList title='Cooking' size='small' videos={cookingVideos} />
				<CardList title='Animals' size='medium' videos={animalVideos} />
				<CardList title='Ocean' size='small' videos={oceanVideos} />
			</main>
		</>
	);
};

export default Home;