import adapter from '@sveltejs/adapter-auto';
import { sveltePreprocess } from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess({
		scss: {
			prependData: `
				@use "src/styles/root/_variables" as *;
				@import "src/styles/root/_mixins.scss";
			`
		},
		postcss: {
			plugins: [autoprefixer()]
		}
	}),

	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components',
			$styles: 'src/styles/routes',
			$utils: 'src/lib/utils',
			$types: 'src/lib/types',
			$stores: 'src/lib/stores/*',
			$images: 'src/lib/images/*'
		}
	}
};

export default config;
