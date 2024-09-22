import { getAllTopics } from '$db/Topic.db';
import type { categorizedTopics } from '$types/Topic.type';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		allTopics: (await getAllTopics(true)) as categorizedTopics
	};
};
