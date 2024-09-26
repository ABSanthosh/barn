import { browser } from '$app/environment';
import type { categorizedTopics } from '$types/Topic.type';
import { writable, type Writable } from 'svelte/store';

export interface IOnboardStore {
	selectedTopicItems: categorizedTopics;
	selectedCities: any[];
}

export const maxTopicCategories = 5;

export function addTopicItems(topicItems: categorizedTopics[0]) {
	// for each topicItem in topicItems
	// if topicItem.category is in selectedTopicItems, add topicItem to selectedTopicItems[topicItem.category]
	// else create a new key in selectedTopicItems with topicItem.category and add topicItem to it
	OnboardStore.update((store) => {
		if (Object.keys(store.selectedTopicItems).length < maxTopicCategories) {
			if (store.selectedTopicItems[topicItems[0].category]) {
				store.selectedTopicItems[topicItems[0].category] = [
					...store.selectedTopicItems[topicItems[0].category],
					...topicItems
				];
			} else {
				store.selectedTopicItems[topicItems[0].category] = topicItems;
			}
		}
		return store;
	});
}

export function removeCategory(category: string) {
	// remove category from selectedTopicItems
	OnboardStore.update((store) => {
		delete store.selectedTopicItems[category];
		return store;
	});
}

export function removeTopicItem(topicItemId: string, category: string) {
	// remove topicItem from selectedTopicItems
	OnboardStore.update((store) => {
		store.selectedTopicItems[category] = store.selectedTopicItems[category].filter(
			(topicItem) => topicItem.id !== topicItemId
		);
		if (store.selectedTopicItems[category].length === 0) {
			delete store.selectedTopicItems[category];
		}
		return store;

		// for (const category in store.selectedTopicItems) {
		// 	store.selectedTopicItems[category] = store.selectedTopicItems[category].filter(
		// 		(topicItem) => topicItem.id !== topicItemId
		// 	);
		// 	if (store.selectedTopicItems[category].length === 0) {
		// 		delete store.selectedTopicItems[category];
		// 	}
		// }
		// return store;
	});
}

const storedOnboardStore = browser ? window.localStorage.getItem('OnboardStore') : null;
export const OnboardStore: Writable<IOnboardStore> = writable(
	storedOnboardStore
		? JSON.parse(storedOnboardStore)
		: {
				selectedTopicItems: {},
				selectedCities: []
			}
);

OnboardStore.subscribe((value) => {
	if (browser) {
		const storedValue = window.localStorage.getItem('OnboardStore');
		const storedData = storedValue ? JSON.parse(storedValue) : null;

		if (!storedData || JSON.stringify(storedData) !== JSON.stringify(value)) {
			window.localStorage.setItem('OnboardStore', JSON.stringify(value));
		}
	}
});
