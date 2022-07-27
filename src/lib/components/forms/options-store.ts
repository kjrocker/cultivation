import { writable } from 'svelte/store';
import type { BodyLaw } from '$lib/data/get-body-laws';
import { SPECIES_OPTIONS, type SpeciesOption } from '$lib/data/species';

export type BodyOptions = {
	temperedHeart: boolean;
	temperedSpine: boolean;
	temperedBrain: boolean;
	fireSpine: boolean;
	illusionBrain: boolean;
	transcendantHeart: boolean;
	law?: BodyLaw;
	species: SpeciesOption;
};

const DefaultOptions: BodyOptions = {
	temperedSpine: true,
	temperedBrain: true,
	temperedHeart: true,
	illusionBrain: false,
	fireSpine: false,
	transcendantHeart: false,
	species: SPECIES_OPTIONS[0],
	law: undefined
};

export const bodyOptionsStore = writable(DefaultOptions);
