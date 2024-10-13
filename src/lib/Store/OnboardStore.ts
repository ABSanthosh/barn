import { browser } from '$app/environment';
import { removeUserCity } from '$db/City.db';
import type { TCity } from '$types/City.type';
import type { categorizedTopics } from '$types/Topic.type';
import { get, writable, type Writable } from 'svelte/store';
import { UserStore } from './UserStore';
import { invalidate } from '$app/navigation';

export interface IOnboardStore {
	selectedTopicItems: categorizedTopics;
	selectedCities: TCity[];
}

export const maxTopicCategories = 5;
export const maxCities = 5;

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
	});
}

export function preloadCities(cities: TCity[]) {
	// add cities to selectedCities if there the cities are not already in selectedCities
	// console.log(cities);
	OnboardStore.update((store) => {
		store.selectedCities = [
			...store.selectedCities,
			...cities.filter((city) => !store.selectedCities.map((c) => c.name).includes(city.name))
		];
		return store;
	});
}

export function toggleCity(city: TCity, standalone = false) {
	// if city is already in selectedCities, remove it; otherwise, add it
	// console.log(get(UserStore).id, city.id);
	OnboardStore.update((store) => {
		// console.log(store.selectedCities);
		// if (store.selectedCities.length >= maxCities) return store;

		const index = store.selectedCities.findIndex((c) => c.name === city.name);
		if (index !== -1) {
			store.selectedCities.splice(index, 1);
			if (standalone) {
				try {
					// removeUserCity(get(UserStore).id, [city.id!]);
					fetch(`/api/UserCity`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							userId: get(UserStore).id,
							cityIds: [city.id!]
						})
					}).then((res) => {
						if (!res.ok) {
							alert('Failed to remove city');
						} else {
							invalidate('app:load');
							alert('City removed');
						}
					});
				} catch (e) {
					console.error(e);
				}
			}
		} else {
			store.selectedCities.push(city);
			if (standalone) {
				try {
					// addUserCity(get(UserStore).id, [city]);
					fetch(`/api/UserCity`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							userId: get(UserStore).id,
							cities: [city]
						})
					}).then((res) => {
						if (!res.ok) {
							alert('Failed to add city');
						} else {
							invalidate('app:load');
							alert('City added');
						}
					});
				} catch (e) {
					console.error(e);
				}
			}
		}
		return store;
	});
}

export function clearLocalOnboardStore() {
	OnboardStore.set({
		selectedTopicItems: {},
		selectedCities: []
	});
}

const storedOnboardStore = browser ? window.localStorage.getItem('OnboardStore') : null;
export const OnboardStore: Writable<IOnboardStore> = writable(
	storedOnboardStore
		? JSON.parse(storedOnboardStore)
		: {
				selectedTopicItems: {},
				selectedCities: [] as TCity[]
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
