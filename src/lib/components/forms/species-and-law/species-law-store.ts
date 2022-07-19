import type { BodyLaw } from '$lib/data/get-body-laws';
import { SPECIES_OPTIONS, type SpeciesOption } from '$lib/data/species';
import { writable } from 'svelte/store';

export type SpeciesAndLaw = { law?: BodyLaw; species: SpeciesOption };

export const DefaultSpeciesLaw: SpeciesAndLaw = { species: SPECIES_OPTIONS[0] };

export const speciesLawStore = writable(DefaultSpeciesLaw);
