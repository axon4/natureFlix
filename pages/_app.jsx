import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Spinner from '../components/spinner/Spinner';
import magicClient from '../lib/magic/client';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
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
				console.error('Error Detecting LogIn State', error);
			};
		})();
	}, []);

	useEffect(() => {
		const unSetLoading = () => {setLoading(false)};

		router.events.on('routeChangeComplete', unSetLoading);
		router.events.on('routeChangeError', unSetLoading);

		return () => {
			router.events.off('routeChangeComplete', unSetLoading);
			router.events.off('routeChangeError', unSetLoading);
		};
	}, [router]);

	return loading ? <Spinner /> : <Component {...pageProps} />
};

export default MyApp;