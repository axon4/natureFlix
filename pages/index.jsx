import Head from 'next/head';
import Navigation from '../components/navigation/Navigation';
import Banner from '../components/banner/Banner';
import styles from '../styles/Home.module.css';
import Card from '../components/card/Card';

export default function Home() {
	return (
		<>
			<Head>
				<title>NatureFlix</title>
			</Head>
			<main className={styles.container}>
				<Navigation userName='test@test.com' />
				<Banner title='Title' subTitle='SubTitle' imageURL='/toucan.jpg' />
				<Card size='small' imageURL='/toucan.jpg' />
				<Card size='medium' imageURL='/toucan.jpg' />
				<Card size='large' imageURL='/toucan.jpg' />
			</main>
		</>
	);
};