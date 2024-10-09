import { writable } from 'svelte/store';

export interface TSetting {
	isSettingsOpen: boolean;
}

export const SettingStore = writable<TSetting>({
	isSettingsOpen: false
});

export const toggleSettings = () => {
	SettingStore.update((prev) => ({
		...prev,
		isSettingsOpen: !prev.isSettingsOpen
	}));
};
