import type { SecretBody } from '$lib/data/get-secret-bodies';
import { writable } from 'svelte/store';

export type SecretBodyStore = SecretBody | undefined;

const createSecretBodyStore = () => {
	const { subscribe, update } = writable<SecretBodyStore>();

	return {
		subscribe,
		toggle: (body: SecretBody) => {
			return update((current) => {
				if (body.Name === current?.Name) return undefined;
				return body;
			});
		}
	};
};

export const secretBodyStore = createSecretBodyStore();
