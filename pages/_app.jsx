import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Spinner from '../components/spinner/Spinner';
import magicClient from '../lib/magic/client';
import '../styles/globals.css';

function Application({ Component, pageProps }) {
	const [ loading, setLoading ] = useState(true);
	const router = useRouter();

	useEffect(() => {
		(async () => {
			try {
				const loggedIn = await magicClient.user.isLoggedIn();

				if (loggedIn) {
					router.push('/');
				} else {
					router.push('/logIn');
				};
			} catch (error) {
				setLoading(false);
				console.error('Error Detecting Log-In--State:', error);
			};
		})();
	}, []);

	useEffect(() => {
		const deLoad = () => {setLoading(false)};

		router.events.on('routeChangeComplete', deLoad);
		router.events.on('routeChangeError', deLoad);

		return () => {
			router.events.off('routeChangeComplete', deLoad);
			router.events.off('routeChangeError', deLoad);
		};
	}, [router]);

	return loading ? <Spinner /> : <Component {...pageProps} />
};

export default Application;