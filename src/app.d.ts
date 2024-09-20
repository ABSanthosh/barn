import type { UserProfile } from '$types/User.type';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: UserProfile | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:outclick'?: () => boolean;
		}
	}
}

export {};
