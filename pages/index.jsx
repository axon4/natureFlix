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
	const popularVideos = await getVideos('popular');

	return {
		props: { natureVideos, cookingVideos, animalVideos, popularVideos }
	};
};

function Home({ natureVideos, cookingVideos }) {
	return (
		<>
			<Head>
				<title>NatureFlix</title>
			</Head>
			<main className={styles.container}>
				<Navigation userName='test@test.com' />
				<Banner title='Title' subTitle='SubTitle' imageURL='/toucan.jpg' />
				<CardList title='Nature' size='large' videos={natureVideos} />
				<CardList title='Cooking' size='small' videos={cookingVideos} />
				<CardList title='Animals' size='medium' videos={animalVideos} />
				<CardList title='Popular' size='small' videos={popularVideos} />
			</main>
		</>
	);
};

export default Home;