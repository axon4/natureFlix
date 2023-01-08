import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './Banner.module.css';

function Banner({ title, subTitle, imageURL, videoID }) {
	const router = useRouter();

	const onClick = event => {
		event.preventDefault();

		router.push(`/video/${videoID}`);
	};

	return (
		<section className={styles.container}>
			<div className={styles.leftWrapper}>
				<div className={styles.left}>
					<div className={styles.nSeriesWrapper}>
						<p className={styles.n}>N</p>
						<p className={styles.series}>S E R I E S</p>
					</div>
					<h1 className={styles.title}>{title}</h1>
					<h2 className={styles.subTitle}>{subTitle}</h2>
					<div className={styles.buttonWrapper}>
						<button className={styles.button} onClick={onClick}>
							<Image src='/play.svg' alt='play' width={32} height={32} />
							<span className={styles.buttonText}>Play</span>
						</button>
					</div>
				</div>
			</div>
			<div style={{backgroundImage: `url(${imageURL})`}} className={styles.hero} />
		</section>
	);
};

export default Banner;