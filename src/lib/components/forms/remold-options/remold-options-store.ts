import { writable } from 'svelte/store';

export type RemoldOptions = {
	temperedHeart: boolean;
	temperedSpine: boolean;
	temperedBrain: boolean;
	fireSpine: boolean;
	illusionBrain: boolean;
	transcendantHeart: boolean;
};

export const DefaultRemoldOptions: RemoldOptions = {
	temperedSpine: true,
	temperedBrain: true,
	temperedHeart: true,
	illusionBrain: false,
	fireSpine: false,
	transcendantHeart: false
};

export const remoldOptions = writable(DefaultRemoldOptions);
