import { GITHUB_PAGES_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { GitHubTopicList, type GithubReadability } from '$types/Topic.type';
import { removeEmptyHtmlTags } from '$utils/readability';

export const load: PageServerLoad = async ({ params, url }) => {
	const api = params.articleID;
	const day = url.searchParams.get('day');
	const topic = url.searchParams.get('topic') as (typeof GitHubTopicList)[number];

	if (!day || !topic) {
		throw redirect(302, '/app');
	} else if (!GitHubTopicList.includes(topic)) {
		throw redirect(302, '/app');
	}
	
	const content = (await fetch(
		`${GITHUB_PAGES_URL}/${day}/${encodeURIComponent(topic)}/readability/${api}.json`
	).then((res) => res.json())) as GithubReadability;

	return {
		content: {
			...content,
			html: removeEmptyHtmlTags(content.html),
			publishedTime: new Date(content.publishedTime).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			})
		}
	};
};
