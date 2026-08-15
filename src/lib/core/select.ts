import { SPECIES_CONFIG, type SpeciesOption } from '$lib/data/species';
import type { BodyLaw, BodyPart, SecretBody } from '$lib/data/types';
import type { CultivatorState, GameData } from './types';

export const selectLaw = (data: GameData, state: CultivatorState): BodyLaw =>
	data.bodyLaws.map[state.options.law];

export const selectSpecies = (state: CultivatorState): SpeciesOption => ({
	...SPECIES_CONFIG[state.options.species],
	key: state.options.species
});

export const selectBodyPart = (data: GameData, state: CultivatorState): BodyPart | undefined =>
	state.selected.bodyPart ? data.bodyParts.map[state.selected.bodyPart] : undefined;

export const selectSecretBody = (data: GameData, state: CultivatorState): SecretBody | undefined =>
	state.selected.secretBody ? data.secretBodies.map[state.selected.secretBody] : undefined;
