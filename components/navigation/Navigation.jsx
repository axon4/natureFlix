import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Logo from '../logo/Logo';
import magicClient from '../../lib/magic/client';
import styles from './Navigation.module.css';

function Navigation() {
	const [ userName, setUserName ] = useState('');
	const [ DIDToken, setDIDToken ] = useState('');
	const [ showDropDown, setShowDropDown ] = useState(false);
	const router = useRouter();

	useEffect(() => {
		(async () => {
			try {
				const { email: eMail } = await magicClient.user.getMetadata();
				const token = await magicClient.user.getIdToken();

				if (eMail) {
					setUserName(eMail);
				};
				
				if (token) {
					setDIDToken(token);
				};
			} catch (error) {
				console.error('Error Getting EMail or DID Token', error);
			};
		})();
	}, []);

	const onHomeClick = event => {
		event.preventDefault();

		router.push('/');
	};

	const onRatingsClick = event => {
		event.preventDefault();
		
		router.push('/ratings');
	};

	const onLogOut = async () => {
		try {
			await fetch('/api/logOut', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${DIDToken}`
				}
			});

			if (await magicClient.user.isLoggedIn()) {
				throw new Error('Still Logged In');
			};
		} catch (error) {
			console.error('Error Logging Out (Client)', error);
		};
	};

	return (
		<nav className={classNames(styles.container, styles.wrapper)}>
			<Logo />
			<ul className={styles.items}>
				<li className={styles.item1} onClick={onHomeClick}>Home</li>
				<li className={styles.item2} onClick={onRatingsClick}>Ratings</li>
			</ul>
			<div className={styles.dropDownContainer}>
				<div>
					<button className={styles.button} onClick={() => {setShowDropDown(!showDropDown)}}>
						<span className={styles.userName}>{userName}</span>
						<Image src='/chevronDown.svg' alt='toggle dropDown' width={24} height={24} />
					</button>
					{showDropDown && (
						<div className={styles.dropDown}>
							<Link className={styles.logOut} href='/logIn' onClick={onLogOut}>Log Out</Link>
							<div className={styles.lineWrapper}></div>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navigation;