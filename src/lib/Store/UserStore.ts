import type { UserProfile, UserSettings } from '$types/User.type';
import { writable, type Writable } from 'svelte/store';

export const UserStore: Writable<
	UserProfile & {
		settings: UserSettings;
	}
> = writable(
	{} as UserProfile & {
		settings: UserSettings;
	}
);

export const setUser = (user: UserProfile | null) => {
	UserStore.update((store) => {
		if (store) {
			return {
				...store,
				...user
			};
		}
		return {} as UserProfile & {
			settings: UserSettings;
		};
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
		return {} as UserProfile & {
			settings: UserSettings;
		};
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
		return {} as UserProfile & {
			settings: UserSettings;
		};
	});
};
