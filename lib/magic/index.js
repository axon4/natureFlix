import { Magic } from 'magic-sdk';

let magic;

if (globalThis.window) {
	magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY);
};

export default magic;