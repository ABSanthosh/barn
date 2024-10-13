import { writable } from 'svelte/store';

export interface TSetting {
	isSettingsOpen: boolean;
}

export const SettingStore = writable<TSetting>({
	isSettingsOpen: true
});

export const toggleSettings = () => {
	SettingStore.update((prev) => ({
		...prev,
		isSettingsOpen: !prev.isSettingsOpen
	}));
};
