import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from './lib/JWT';

async function middleWare(request, event) {
	const token = request.cookies.get('token')?.value;
	const userID = await getAuthenticatedUser(token);
	const { pathname } = request.nextUrl;

	// console.log('middleWare event:', event);

	if (userID || pathname.includes('/_next')  || pathname.includes('/logIn') || pathname.includes('/static') || pathname.includes('.ico') || pathname.includes('.jpg')|| pathname.includes('.svg')) {
		return NextResponse.next();
	};

	if ((!token || !userID) && !pathname.includes('/logIn')) {
		return NextResponse.redirect(new URL('/logIn', request.nextUrl.clone()));
	};
};

export default middleWare;