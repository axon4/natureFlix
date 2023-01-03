import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Card.module.css';
import classNames from 'classnames';

function Card({ size = 'medium', imageURL = '/toucan.png' }) {
	const [ source, setSource ] = useState(imageURL);

	const onError = event => {
		setSource('/toucan.png');
		console.error(event);
	};

	return (
		<article className={styles.container}>
			<motion.div className={classNames(styles.animationWrapper, styles[size])} whileHover={{scale: 1.2}}>
				<Image className={styles.image} src={source} alt='image' fill onError={onError} />
			</motion.div>
		</article>
	);
};

export default Card;