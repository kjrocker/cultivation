import { svelte } from '@sveltejs/vite-plugin-svelte';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [svelte()],
	test: { globals: true, setupFiles: ['src/setupTests.js'] }
};

export default config;
