import type { UserProfile, UserSettings } from '$types/User.type';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user:
				| (UserProfile & {
						settings: UserSettings;
				  })
				| null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:outclick'?: () => any;
		}
	}
}

export {};
