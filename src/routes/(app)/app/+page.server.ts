import { getUniqueUserTopics } from '$db/Topic.db';
import { GITHUB_PAGES_URL } from '$env/static/private';
import type { GithubTopic } from '$types/Topic.type';
import type { UserSettings } from '$types/User.type';
import type { Actions, PageServerLoad } from './$types';
import { makeUserPremium, updateUserName, updateUserSetting } from '$db/User.db';
import { getAllUserCity } from '$db/City.db';
import { getWeatherCardData } from '$utils/weather';
import type { WeatherResponse } from '$types/Weather.type';
import { getAllUserBookmark } from '$db/Bookmark.db';

function fixRelativeLinks(topics: GithubTopic[]) {
	return topics.map((topic) => {
		if (topic.image.startsWith('/')) {
			topic.image = '';
		}
		return topic;
	});
}

export const load: PageServerLoad = async ({ locals, depends }) => {
	depends('app:load');

	const allUserTopics = await getUniqueUserTopics(locals.user?.id!);
	const allUserCities = await getAllUserCity(locals.user?.id!);

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
					.slice(0, locals.user?.settings.articlesPerPage);
			})
		)
	).flat() as GithubTopic[];

	return {
		weatherData: (await getWeatherCardData(
			allUserCities.map((city) => ({ lat: city.lat, lon: city.lon }))
		)) as WeatherResponse[],
		userContent: fixRelativeLinks(userContent),
		userBookmarks: await getAllUserBookmark(locals.user?.id!)
	};
};

export const actions: Actions = {
	updateSettings: async ({ request }) => {
		const formData = await request.formData();
		const data = JSON.parse(`${Object.fromEntries(formData)['userStore']}`) as {
			name: string;
			id: string;
			settings: UserSettings;
		};

		return {
			user: await updateUserName(data.id, data.name),
			settings: await updateUserSetting(data.id, data.settings)
		};
	},
	updateGeneralSettings: async ({ request }) => {
		const formData = await request.formData();
		const data = JSON.parse(`${Object.fromEntries(formData)['userStore']}`) as {
			id: string;
			settings: UserSettings;
		};

		return {
			settings: await updateUserSetting(data.id, data.settings)
		};
	},
	confirmPremiumPurchase: async ({ request }) => {
		const id = (await request.formData()).get('id') as string;
		// const id = (await request.json()).id as string;

		return {
			response: await makeUserPremium(id)
		};
	}
};
