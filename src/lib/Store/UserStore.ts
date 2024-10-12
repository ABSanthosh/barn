import type { UserProfile, UserSettings } from '$types/User.type';
import { writable, type Writable } from 'svelte/store';

export const UserStore: Writable<
	| (UserProfile & {
			settings: UserSettings;
	  })
	| null
> = writable({
	id: '',
	email: '',
	name: '',
	picture: null,
	premiumUser: false,
	newUser: true,
	updatedAt: new Date(),
	settings: {
		phone: null,
		isStudent: false,
		school: null,
		dateOfBirth: null,
		articlesPerPage: 0,
		theme: 'light'
	}
});

export const setUser = (user: UserProfile | null) => {
	UserStore.update((store) => {
		if (store) {
			return {
				...store,
				...user
			};
		}
		return null;
	});
};

export const setUserSettings = (settings: UserSettings) => {
	UserStore.update((store) => {
		if (store) {
			return {
				...store,
				settings
			};
		}
		return null;
	});
};

export const setUserPremium = (premiumUser: boolean) => {
	UserStore.update((store) => {
		if (store) {
			return {
				...store,
				premiumUser
			};
		}
		return null;
	});
}
