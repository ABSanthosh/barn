import { writable, type Writable } from 'svelte/store';

export const OnboardStore: Writable<any[]> = writable([]);
