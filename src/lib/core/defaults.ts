import type { BodyOptions, CultivatorState } from './types';

export const DEFAULT_OPTIONS: BodyOptions = {
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

export const createDefaultState = (): CultivatorState => ({
	options: { ...DEFAULT_OPTIONS },
	partLabels: {},
	equipped: { offensive: [], defensive: [], effective: [] },
	selected: { bodyPart: undefined, secretBody: undefined }
});

export const DEFAULT_STATE: CultivatorState = createDefaultState();

/** The one extra tempering each body law unlocks. Total over `static/Data/BodyLaws.json`. */
export const LAW_TEMPERING = {
	Body_Gong_1: null,
	Body_Gong_2: 'fireSpine',
	Body_Gong_3: 'illusionBrain',
	Body_Gong_5: 'transcendantHeart'
} as const;

export const TEMPERING_FLAGS = ['fireSpine', 'illusionBrain', 'transcendantHeart'] as const;

export type TemperingFlag = typeof TEMPERING_FLAGS[number];

export const isTemperingAllowed = (law: string, flag: TemperingFlag): boolean =>
	LAW_TEMPERING[law as keyof typeof LAW_TEMPERING] === flag;

export const GLOBAL_BONUS_PROPS = [
	'AtkPower',
	'DefPower',
	'AtkRate',
	'DefRate',
	'CatchFabao',
	'ArmorPenetration'
] as const;

export type GlobalBonusProp = typeof GLOBAL_BONUS_PROPS[number];
