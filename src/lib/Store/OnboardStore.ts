import { browser } from '$app/environment';
import type { categorizedTopics } from '$types/Topic.type';
import { writable, type Writable } from 'svelte/store';

export interface IOnboardStore {
	selectedTopicItems: categorizedTopics[0];
	selectedCities: any[];
}

const storedOnboardStore = browser ? window.localStorage.getItem('OnboardStore') : null;
export const OnboardStore: Writable<IOnboardStore> = writable(
	storedOnboardStore
		? JSON.parse(storedOnboardStore)
		: {
				selectedTopicItems: [],
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
