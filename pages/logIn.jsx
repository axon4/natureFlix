import Head from 'next/head';
import Logo from '../components/logo/Logo';
import styles from '../styles/logIn.module.css';

function logIn() {
	return (
		<>
			<Head>
				<title>Log In | NatureFlix</title>
			</Head>
			<main>
				<header className={styles.header}>
					<Logo />
				</header>
			</main>
		</>
	);
};

export default logIn;