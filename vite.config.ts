import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		// Eliminate in-source test code
		'import.meta.vitest': 'undefined'
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		globals: true,
		setupFiles: ['./setupTest.ts'],
		environment: 'jsdom'
	}
});
