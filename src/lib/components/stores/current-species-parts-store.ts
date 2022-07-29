import { bodyPartsStore } from '$lib/data/get-body-parts';
import { derived } from 'svelte/store';
import { bodyOptionsStore } from '../forms/options-store';

export const currentSpeciesPartsStore = derived(
	[bodyOptionsStore, bodyPartsStore],
	([options, parts]) => {
		const partsList = parts.species[options.species];
		return partsList;
	}
);
