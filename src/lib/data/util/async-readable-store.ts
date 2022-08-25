import { writable } from 'svelte/store';

export const createStaticAsyncStore = <T>(fn: () => Promise<T>) => {
	const { subscribe, set } = writable<T>(null as unknown as T);

	return {
		subscribe,
		init: async () => {
			const response = await fn();
			set(response);
			return response;
		}
	};
};
