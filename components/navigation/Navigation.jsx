import classNames from 'classnames';
import styles from './Navigation.module.css';

function Navigation({ userName }) {
	return (
		<nav className={classNames(styles.container, styles.wrapper)}>
			<a className={classNames(styles.logoLink, styles.logoWrapper)}>NatureFlix</a>
			<ul className={styles.items}>
				<li className={styles.item1}>Home</li>
				<li className={styles.item2}>Likes/DisLikes</li>
			</ul>
			<div className={styles.dropDownContainer}>
				<button className={styles.button}>
					<span className={styles.userName}>{userName}</span>
				</button>
				<div className={styles.dropDown}>
					<a className={styles.logOut}>Log Out</a>
					<div className={styles.lineWrapper}></div>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;