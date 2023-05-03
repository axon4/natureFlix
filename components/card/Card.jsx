import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import styles from './Card.module.css';

function Card({ size = 'medium', imageURL = '/toucan.jpg', endOfList }) {
	const [ source, setSource ] = useState(imageURL);

	const scalar = endOfList ? 'scaleY' : 'scale';

	const onError = event => {
		setSource('/toucan.jpg');
		console.error(event);
	};

	return (
		<article className={styles.container}>
			<motion.div className={classNames(styles.animationWrapper, styles[size])} whileHover={{[scalar]: 1.1}}>
				<Image className={styles.image} src={source} alt='thumbNail' fill onError={onError} />
			</motion.div>
		</article>
	);
};

export default Card;