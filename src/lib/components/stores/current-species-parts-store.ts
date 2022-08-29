import { bodyPartsStore } from '$lib/data/stores';
import { derived } from 'svelte/store';
import { bodyOptionsStore } from './options-store';

export const currentSpeciesPartsStore = derived(
	[bodyOptionsStore, bodyPartsStore],
	([options, parts]) => {
		const partsList = parts.species[options.species];
		return partsList;
	}
);
