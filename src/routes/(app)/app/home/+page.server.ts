import { getAllUserTopics } from '$db/Topic.db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	console.log('Page server load', await getAllUserTopics(locals.user?.id!));
};
