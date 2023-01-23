import Head from 'next/head';
import Navigation from '../components/navigation/Navigation';
import CardList from '../components/card/CardList';
import styles from '../styles/Ratings.module.css';

function Ratings() {
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
					<CardList title='Likes' size='small' videos={[]} />
					<CardList title='DisLikes' size='small' videos={[]} />
				</section>
			</main>
		</>
	);
};

export default Ratings;