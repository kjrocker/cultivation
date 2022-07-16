import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: { globals: true, setupFiles: ['src/setupTests.js'] }
};

export default config;
