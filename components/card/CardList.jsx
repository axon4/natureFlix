import Link from 'next/link';
import Card from './Card';
import styles from './CardList.module.css';

function CardList({ title, size, videos = [] }) {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.cardWrapper}>
				{videos.map((video, index) => (
					<Link href={`/video/${video.ID}`}>
						<Card size={size} imageURL={video.imageURL} endOfList={index === 0 || index === (videos.length - 1)} />
					</Link>
				))}
			</div>
		</section>
	);
};

export default CardList;