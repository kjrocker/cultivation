import { bodyLawStore, type BodyLaw } from '$lib/data/get-body-laws';
import { bodyPartsStore } from '$lib/data/get-body-parts';
import { secretBodyStore } from '$lib/data/get-secret-bodies';
import { SPECIES_CONFIG, type SpeciesOption } from '$lib/data/species';
import { derived, writable, type Readable } from 'svelte/store';
import { bodyOptionsStore } from '../forms/options-store';

export type SelectedStore = { bodyPart?: string; secretBody?: string };

const createSelectedStore = () => {
	const { subscribe, set, update } = writable<SelectedStore>({
		bodyPart: undefined,
		secretBody: undefined
	});

	return {
		subscribe,
		set,
		update,
		clear: () => set({ bodyPart: undefined, secretBody: undefined }),
		toggleSecretBody: (name: string) => {
			return update((selected) => {
				if (selected.secretBody === name) {
					selected.secretBody = undefined;
				} else {
					selected.secretBody = name;
				}
				return selected;
			});
		}
	};
};

export const selectedStore = createSelectedStore();

export const selectedLawStore: Readable<BodyLaw> = derived(
	[bodyOptionsStore, bodyLawStore],
	([options, laws]) => laws.map[options.law]
);

export const selectedSpeciesStore: Readable<SpeciesOption> = derived(
	[bodyOptionsStore],
	([options]) => ({
		...SPECIES_CONFIG[options.species],
		key: options.species
	})
);

export const selectedBodyPart = derived([selectedStore, bodyPartsStore], ([selected, parts]) =>
	selected.bodyPart ? parts.map[selected.bodyPart] : undefined
);

export const selectedSecretBody = derived([selectedStore, secretBodyStore], ([selected, bodies]) =>
	selected.secretBody ? bodies.map[selected.secretBody] : undefined
);
