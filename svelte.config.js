import adapter from '@sveltejs/adapter-static';

const production = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html'
		}),
		prerender: {
			handleHttpError: 'warn'
		},
		paths: {
			base: production ? '/Ahmad/ess-demo' : ''
		}
	}
};

export default config;
