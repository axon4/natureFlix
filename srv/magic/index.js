import magicClient from '../../lib/magic/client';

export async function magicLogIn(eMail) {
	return await magicClient?.auth.loginWithMagicLink({ email: eMail });
};