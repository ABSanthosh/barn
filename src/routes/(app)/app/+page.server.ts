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
		allUserTopics.map((topic) => {
			const category = encodeURIComponent(topic.category);
			return `${GITHUB_PAGES_URL}/today/${category}/${category}.json`;
		})
	);

	const userContent = (
		await Promise.all(
			Array.from(uniqueCategories).map(async (url) => {
				const response = await fetch(url);
				return (await response.json())
					.map((topic: GithubTopic) => {
						topic.topic = url.split('/').pop()!.replace('.json', '');
						return topic;
					})
					.slice(0, 10);
			})
		)
	).flat() as GithubTopic[];

	return {
		userContent
	};
};
