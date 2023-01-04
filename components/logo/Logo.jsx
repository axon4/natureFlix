import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './Logo.module.css';

function Logo() {
	return (
		<Link className={classNames(styles.logoLink, styles.logoWrapper)} href='/'>
			<Image src='/natureFlix.svg' alt='NatureFlix' width={128} height={32} />
		</Link>
	);
};

export default Logo;