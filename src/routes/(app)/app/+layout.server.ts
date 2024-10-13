import { getAllUserCity } from '$db/City.db';
import { getAllTopics } from '$db/Topic.db';
import type { TCity } from '$types/City.type';
import type { categorizedTopics } from '$types/Topic.type';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		allTopics: (await getAllTopics(true)) as categorizedTopics,
		userCities: (await getAllUserCity(locals.user?.id!)) as TCity[]
	};
};
