import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({ postcss: true }),

	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		paths: {
			// change below to your repo name
			base: '/cultivation'
		}
	}
};

export default config;
