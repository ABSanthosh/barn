import { getUniqueUserTopics } from '$db/Topic.db';
import { GITHUB_PAGES_URL } from '$env/static/private';
import type { GithubTopic } from '$types/Topic.type';
import type { UserSettings } from '$types/User.type';
import type { Actions, PageServerLoad } from './$types';
import { makeUserPremium, updateUserName, updateUserSetting } from '$db/User.db';

function shuffle<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function fixRelativeLinks(topics: GithubTopic[]) {
	return topics.map((topic) => {
		if (topic.image.startsWith('/')) {
			topic.image = '';
		}
		return topic;
	});
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
					.slice(0, locals.user?.settings.articlesPerPage);
			})
		)
	).flat() as GithubTopic[];

	return {
		userContent: fixRelativeLinks(userContent)
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
