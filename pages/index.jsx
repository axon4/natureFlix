import Head from 'next/head';
import Navigation from '../components/navigation/Navigation';
import Banner from '../components/banner/Banner';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<>
			<Head>
				<title>NatureFlix</title>
			</Head>
			<main className={styles.container}>
				<Navigation userName='test@test.com' />
				<Banner title='Title' subTitle='SubTitle' imageURL='/toucan.jpg' />
			</main>
		</>
	);
};