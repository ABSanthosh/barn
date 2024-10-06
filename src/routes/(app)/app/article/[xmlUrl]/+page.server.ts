import parse from '$utils/readability';
import type { PageServerLoad } from './$types';
import { JSDOM } from 'jsdom';

export const load: PageServerLoad = async ({ params }) => {
	const api = params.xmlUrl;
	const response = await fetch(api);

	if (!response.ok) {
		throw new Error(`Failed to fetch: ${response.status}`);
	}

	const text = await response.text();
	const doc = new JSDOM(text).window.document;
	return {
		content: { ...parse(doc), source: api }
	};
};
