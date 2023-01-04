import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Logo from '../components/logo/Logo';
import styles from '../styles/logIn.module.css';

function logIn() {
	const [ eMail, setEMail ] = useState('');
	const [ eMailValidity, setEMailValidity ] = useState(false);
	const router = useRouter();

	const onChange = ({ target }) => {
		setEMail(target.value);
		setEMailValidity(target.validity.valid);
	};

	const onClick = event => {
		event.preventDefault();

		if (eMailValidity) {
			router.push('/');
		};
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
						<input className={styles.input} type='email' placeholder='EMail' onChange={onChange} />
						{!eMailValidity && eMail && <pre className={styles.error}>InValid EMail Address</pre>}
						<button className={styles.button} type='submit' onClick={onClick}>Log In</button> 
					</form>
				</main>
			</div>
		</>
	);
};

export default logIn;