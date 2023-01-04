import magic from '../../lib/magic';

export async function magicLogIn(eMail) {
	return await magic?.auth.loginWithMagicLink({ email: eMail });
};