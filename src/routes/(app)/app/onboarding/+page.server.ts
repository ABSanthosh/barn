import { addUserCity } from '$db/City.db';
import { addUserTopics } from '$db/Topic.db';
import type { TCity } from '$types/City.type';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { takeUserVirginity } from '$db/User.db';

export const actions: Actions = {
	preferences: async ({ request }) => {
		let formData = JSON.parse(`${(await request.formData()).get('onboardStore')}`) as {
			userId: string;
			selectedTopicItems: string[];
			selectedCities: TCity[];
		};

		const result = {
			city: await addUserCity(formData.userId, formData.selectedCities),
			topics: await addUserTopics(formData.userId, formData.selectedTopicItems),
			userVirginity: await takeUserVirginity(formData.userId)
		};

		if (result.city && result.topics) {
			throw redirect(302, '/app/home');
		}
	}
};
