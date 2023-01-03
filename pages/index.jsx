import Head from 'next/head';
import Banner from '../components/banner/Banner';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<>
			<Head>
				<title>NatureFlix</title>
			</Head>
			<main className={styles.container}>
				<h1>NatureFlix</h1>
				<Banner title='Title' subTitle='SubTitle' imageURL='/toucan.jpg' />
			</main>
		</>
	);
};