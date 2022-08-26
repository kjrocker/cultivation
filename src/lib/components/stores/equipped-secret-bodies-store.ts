import { writable } from 'svelte/store';

export type PartLabelCount = { Name: string; Level: number; MaxLevel: number };

export type EquippedSecretBodyStore = {
	offensive: string[];
	defensive: string[];
	effective: string[];
};

const initialStore = { offensive: [], defensive: [], effective: [] };

const createEquippedSecretBodiesStore = () => {
	const { subscribe, set, update } = writable<EquippedSecretBodyStore>(initialStore);

	return {
		subscribe,
		set,
		update,
		reset: () => set(initialStore),
		add: (type: keyof EquippedSecretBodyStore, name: string) => {
			return update((old) => {
				if (old[type].includes(name)) {
					return old;
				} else {
					old[type].push(name);
					return old;
				}
			});
		},
		remove: (type: keyof EquippedSecretBodyStore, name: string) => {
			return update((old) => {
				if (old[type].includes(name)) {
					old[type] = old[type].filter((k) => k !== name);
					return old;
				} else {
					return old;
				}
			});
		}
	};
};

export const equippedSecretBodyStore = createEquippedSecretBodiesStore();
