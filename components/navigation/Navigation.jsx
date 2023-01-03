import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import styles from './Navigation.module.css';

function Navigation({ userName }) {
	const router = useRouter();

	const onHomeClick = event => {
		event.preventDefault();
		router.push('/');
	};

	const onListClick = event => {
		event.preventDefault();
		router.push('/browse/list');
	};

	return (
		<nav className={classNames(styles.container, styles.wrapper)}>
			<a className={classNames(styles.logoLink, styles.logoWrapper)}>NatureFlix</a>
			<ul className={styles.items}>
				<li className={styles.item1} onClick={onHomeClick}>Home</li>
				<li className={styles.item2} onClick={onListClick}>List</li>
			</ul>
			<div className={styles.dropDownContainer}>
				<div>
					<button className={styles.button}>
						<span className={styles.userName}>{userName}</span>
					</button>
					<div className={styles.dropDown}>
						<Link className={styles.logOut} href='/login'>Log Out</Link>
						<div className={styles.lineWrapper}></div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;