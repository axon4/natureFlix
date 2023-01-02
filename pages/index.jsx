import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<>
			<Head>
				<title>NatureFlix</title>
			</Head>
			<main className={styles.container}>
				<h1>NatureFlix</h1>
			</main>
		</>
	);
};