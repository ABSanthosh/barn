import { addUserTopics, getAllTopics, getAllUserTopics, removeUserTopics } from '$db/Topic.db';
import type { categorizedTopics } from '$types/Topic.type';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		allTopics: (await getAllTopics(true)) as categorizedTopics
	};
};

export const actions: Actions = {
	getTopicsByUserId: async ({ request }) => {
		const formData = JSON.parse(`${(await request.formData()).get('UserPreference')}`) as {
			userId: string;
		};
		return await getAllUserTopics(formData.userId);
	},
	removeUserTopics: async ({ request }) => {
		const formData = JSON.parse(`${(await request.formData()).get('UserPreference')}`) as {
			userId: string;
			topicIds: string[];
		};
		return await removeUserTopics(formData.userId, formData.topicIds);
	},
	addUserTopics: async ({ request }) => {
		const formData = JSON.parse(`${(await request.formData()).get('UserPreference')}`) as {
			userId: string;
			topicIds: string[];
		};
		return await addUserTopics(formData.userId, formData.topicIds);
	}
};
