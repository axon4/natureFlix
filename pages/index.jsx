import Head from 'next/head';
import Navigation from '../components/navigation/Navigation';
import Banner from '../components/banner/Banner';
import CardList from '../components/card/CardList';
import { getVideos } from '../srv/youTube';
import styles from '../styles/Home.module.css';

export async function getServerSideProps() {
	const natureVideos = await getVideos('nature');
	const cookingVideos = await getVideos('cooking', 'UCj4KP216972cPp2w_BAHy8g');
	const animalVideos = await getVideos('animal');
	const oceanVideos = await getVideos('ocean');

	return {
		props: { natureVideos, cookingVideos, animalVideos, oceanVideos }
	};
};

function Home({ natureVideos, cookingVideos, animalVideos, oceanVideos }) {
	return (
		<>
			<Head>
				<title>NatureFlix</title>
			</Head>
			<main className={styles.container}>
				<Navigation />
				<Banner title='Title' subTitle='SubTitle' imageURL='/toucan.jpg' />
				<CardList title='Nature' size='large' videos={natureVideos} />
				<CardList title='Cooking' size='small' videos={cookingVideos} />
				<CardList title='Animals' size='medium' videos={animalVideos} />
				<CardList title='Ocean' size='small' videos={oceanVideos} />
			</main>
		</>
	);
};

export default Home;