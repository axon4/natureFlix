import { useState } from 'react';
import Image from 'next/image';
import styles from './Card.module.css';

function Card({ size = 'medium', imageURL = '/toucan.png' }) {
	const [ source, setSource ] = useState(imageURL);

	const onError = event => {
		setSource('/toucan.png');
		console.error(event);
	};

	return (
		<article className={styles.container}>
			<div className={styles[size]}>
				<Image className={styles.image} src={source} alt='image' fill onError={onError} />
			</div>
		</article>
	);
};

export default Card;