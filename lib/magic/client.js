import { Magic } from 'magic-sdk';

let magicClient;

if (globalThis.window) {
	magicClient = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY);
};

export default magicClient;