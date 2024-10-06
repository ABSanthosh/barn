import { getUniqueUserTopics } from '$db/Topic.db';
import { GITHUB_PAGES_URL } from '$env/static/private';
import type { GithubTopic } from '$types/Topic.type';
import type { PageServerLoad } from './$types';

function shuffle<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export const load: PageServerLoad = async ({ locals }) => {
	const allUserTopics = await getUniqueUserTopics(locals.user?.id!);

	const uniqueCategories = new Set(
		allUserTopics.map(
			(topic) => `${GITHUB_PAGES_URL}/today/${encodeURIComponent(topic.category)}.json`
		)
	);
	const userContent: GithubTopic[] = shuffle(
		(
			await Promise.all(
				Array.from(uniqueCategories).map(async (url) => {
					const response = await fetch(url);
					const json = (await response.json()).slice(0, 10);
					return json;
				})
			)
		).flat() as GithubTopic[]
	);

	return {
		userContent
	};
};
