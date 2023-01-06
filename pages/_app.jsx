import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import magic from '../lib/magic';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	const [ loading, setLoading ] = useState(true);
	const router = useRouter();

	useEffect(() => {
		(async () => {
			try {
				const loggedIn = await magic.user.isLoggedIn();

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

	return loading ? <div>Loading...</div> : <Component {...pageProps} />
};

export default MyApp;