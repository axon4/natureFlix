import Head from 'next/head';
import Navigation from '../components/navigation/Navigation';
import Banner from '../components/banner/Banner';
import CardList from '../components/card/CardList';
import styles from '../styles/Home.module.css';

const videos = [
	{
		imageURL: '/toucan.jpg'
	},
	{
		imageURL: '/toucan.jpg'
	},
	{
		imageURL: '/toucan.jpg'
	},
	{
		imageURL: '/toucan.jpg'
	},
	{
		imageURL: '/toucan.jpg'
	},
	{
		imageURL: '/toucan.jpg'
	},
	{
		imageURL: '/toucan.jpg'
	}
];

export default function Home() {
	return (
		<>
			<Head>
				<title>NatureFlix</title>
			</Head>
			<main className={styles.container}>
				<Navigation userName='test@test.com' />
				<Banner title='Title' subTitle='SubTitle' imageURL='/toucan.jpg' />
				<CardList title='Nature' size='large' videos={videos} />
				<CardList title='Nature' size='medium' videos={videos} />
				<CardList title='Nature' size='large' videos={videos} />
			</main>
		</>
	);
};