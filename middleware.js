import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from './lib/JWT';

async function middleWare(request, event) {
	const token = request.cookies.get('token')?.value;
	const userID = await getAuthenticatedUser(token);
	const { pathname } = request.nextUrl;

	if (userID || pathname.includes('/logIn') || pathname.includes('/static') || pathname.includes('.ico') || pathname.includes('.jpg')|| pathname.includes('.svg')) {
		return NextResponse.next();
	};

	if ((!token || !userID) && pathname !== '/logIn') {
		const URL = request.nextUrl.clone();
		URL.pathname = '/logIn';
		
		return NextResponse.redirect(URL);
	};
};

export default middleWare;