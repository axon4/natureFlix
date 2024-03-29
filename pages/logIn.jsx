import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Logo from '../components/logo/Logo';
import { magicLogIn } from '../srv/magic';
import styles from '../styles/logIn.module.css';

function LogIn() {
	const [ eMail, setEMail ] = useState('');
	const [ eMailValidity, setEMailValidity ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const deLoad = () => {setLoading(false)};

		router.events.on('routeChangeComplete', deLoad);
		router.events.on('routeChangeError', deLoad);

		return () => {
			router.events.off('routeChangeComplete', deLoad);
			router.events.off('routeChangeError', deLoad);
		};
	}, [router]);

	const onChange = ({ target }) => {
		setEMail(target.value);
		setEMailValidity(target.validity.valid);
	};

	const onClick = async event => {
		event.preventDefault();

		if (eMailValidity) {
			try {
				setLoading(true);

				const DIDToken = await magicLogIn(eMail);

				if (DIDToken) {
					const response = await fetch('/api/logIn', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${DIDToken}`
						}
					});

					if (response.status === 200) {
						router.reload();
						router.push('/');
					} else {
						throw new Error('LogIn-API--Failure');
					};
				};

			} catch (error) {
				setLoading(false);
				console.error('Error Logging-In:', error);
			};
		};
	};

	return (
		<>
			<Head>
				<title>Log-In | NatureFlix</title>
			</Head>
			<div className={styles.container}>
				<header>
					<nav className={styles.navigation}>
						<Logo />
					</nav>
				</header>
				<main className={styles.main}>
					<form className={styles.form}>
						<h1 className={styles.heading}>Log-In</h1>
						<input className={styles.inPut} type='email' placeholder='EMail' onChange={onChange} />
						{eMail && !eMailValidity && <pre className={styles.error}>InValid EMail-Address</pre>}
						<button className={styles.button} type='submit' onClick={onClick}>
							{loading ? 'Logging-In...' : 'Log-In'}
						</button>
					</form>
				</main>
			</div>
		</>
	);
};

export default LogIn;