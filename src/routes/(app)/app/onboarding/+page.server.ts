import { addUserCity } from '$db/City.db';
import { addUserTopics } from '$db/Topic.db';
import type { TCity } from '$types/City.type';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { takeUserVirginity } from '$db/User.db';

export const load: PageServerLoad = async ({ request }) => {
	if (request.method === 'GET') {
		throw redirect(302, '/app/onboarding/feed');
	}
};

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

		if (result.city && result.topics && result.userVirginity) {
			throw redirect(302, '/app');
		}
	}
};
