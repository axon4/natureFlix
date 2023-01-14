import { Magic } from '@magic-sdk/admin';

const magicServer = new Magic(process.env.MAGIC_SECRET_KEY);

export default magicServer;