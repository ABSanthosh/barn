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
	newUser: true,
	updatedAt: new Date(),
	settings: {
		phone: null,
		isStudent: false,
		school: null,
		dateOfBirth: null
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
