import Head from 'next/head';
import Logo from '../components/logo/Logo';
import styles from '../styles/logIn.module.css';

function logIn() {
	const onClick = event => {
		event.preventDefault();

		console.log('CLICK');
	};

	return (
		<>
			<Head>
				<title>Log In | NatureFlix</title>
			</Head>
			<div className={styles.container}>
				<header>
					<nav className={styles.navigation}>
						<Logo />
					</nav>
				</header>
				<main className={styles.main}>
					<form className={styles.form}>
						<h1 className={styles.heading}>Log In</h1>
						<input className={styles.input} type='email' placeholder='EMail' />
						<pre className={styles.error}></pre>
						<button className={styles.button} type='submit' onClick={onClick}>Log In</button> 
					</form>
				</main>
			</div>
		</>
	);
};

export default logIn;