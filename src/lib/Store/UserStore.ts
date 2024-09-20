import type { UserProfile } from '$types/User.type';
import { writable, type Writable } from 'svelte/store';

export const UserStore: Writable<UserProfile | null> = writable();
