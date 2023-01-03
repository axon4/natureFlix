import Document, { Html as HTML, Head, Main, NextScript } from 'next/document';

class Document2 extends Document {
	render() {
		return (
			<HTML>
				<Head>
					<meta name='title' content='NatureFlix' />
					<meta name='description' content='Watch Videos to Admire the Beauty of Nature' />
					<title>NatureFlix</title>
					<link rel='icon' type='image/x-icon' href='/favicon.ico' />
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
					<link rel='stylesheet' type='text/css' href='https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap' />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</HTML>
		);
	};
};

export default Document2;