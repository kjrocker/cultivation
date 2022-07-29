import type { SpeciesKeys } from '$lib/data/species';
import { writable } from 'svelte/store';

export type BodyOptions = {
	temperedHeart: boolean;
	temperedSpine: boolean;
	temperedBrain: boolean;
	fireSpine: boolean;
	illusionBrain: boolean;
	transcendantHeart: boolean;
	law: string;
	species: SpeciesKeys;
	name: string;
};

const DefaultOptions: BodyOptions = {
	temperedSpine: true,
	temperedBrain: true,
	temperedHeart: true,
	illusionBrain: false,
	fireSpine: false,
	transcendantHeart: false,
	species: 'human',
	law: 'Body_Gong_1',
	name: ''
};

export const bodyOptionsStore = writable(DefaultOptions);
