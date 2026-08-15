import type { LabelView } from '$lib/data/types';
import { uniqBy } from 'ramda';
import { LAW_TEMPERING, TEMPERING_FLAGS } from './defaults';
import type {
	BodyOptions,
	CultivatorState,
	EquippedSecretBodies,
	PartLabelCount,
	PartLabelCounts
} from './types';

/**
 * Note: the saved level is discarded — a label always enters the build at its max
 * level. Existing behaviour, see the V3 backup shape for what a fix would need.
 */
export const toLabelCount = (label: LabelView): PartLabelCount => ({
	Name: label.Name,
	Level: label.MaxLevel,
	MaxLevel: label.MaxLevel
});

const emptyLabels = (names: string[], previous: PartLabelCounts = {}): PartLabelCounts =>
	names.reduce((acc, name) => {
		acc[name] = previous[name] ?? [];
		return acc;
	}, {} as PartLabelCounts);

/** Keep the labels of every surviving part, drop the rest, seed the new ones empty. */
export const setParts = (state: CultivatorState, names: string[]): CultivatorState => ({
	...state,
	partLabels: emptyLabels(names, state.partLabels)
});

export const initParts = (state: CultivatorState, names: string[]): CultivatorState => ({
	...state,
	partLabels: emptyLabels(names)
});

export const setPartLabels = (
	state: CultivatorState,
	name: string,
	labels: LabelView[]
): CultivatorState => ({
	...state,
	partLabels: { ...state.partLabels, [name]: labels.map(toLabelCount) }
});

export const appendPartLabels = (
	state: CultivatorState,
	name: string,
	labels: LabelView[]
): CultivatorState => ({
	...state,
	partLabels: {
		...state.partLabels,
		[name]: uniqBy(
			(l: PartLabelCount) => l.Name,
			[...(state.partLabels[name] ?? []), ...labels.map(toLabelCount)]
		)
	}
});

export const mergePartLabels = (
	state: CultivatorState,
	counts: PartLabelCounts
): CultivatorState => ({
	...state,
	partLabels: { ...state.partLabels, ...counts }
});

export const equipBody = (
	state: CultivatorState,
	type: keyof EquippedSecretBodies,
	name: string
): CultivatorState => {
	if (state.equipped[type].includes(name)) return state;
	return { ...state, equipped: { ...state.equipped, [type]: [...state.equipped[type], name] } };
};

export const unequipBody = (
	state: CultivatorState,
	type: keyof EquippedSecretBodies,
	name: string
): CultivatorState => {
	if (!state.equipped[type].includes(name)) return state;
	return {
		...state,
		equipped: { ...state.equipped, [type]: state.equipped[type].filter((k) => k !== name) }
	};
};

export const selectBodyPart = (state: CultivatorState, name?: string): CultivatorState => ({
	...state,
	selected: { ...state.selected, bodyPart: name }
});

export const toggleSecretBody = (state: CultivatorState, name: string): CultivatorState => ({
	...state,
	selected: {
		...state.selected,
		secretBody: state.selected.secretBody === name ? undefined : name
	}
});

export const clearSelection = (state: CultivatorState): CultivatorState => ({
	...state,
	selected: { bodyPart: undefined, secretBody: undefined }
});

/**
 * A body law unlocks exactly one of the three extra temperings; clear the others.
 * This used to be a reactive write-back block in options-form.svelte.
 */
export const normalizeOptions = (options: BodyOptions): BodyOptions => {
	const allowed = LAW_TEMPERING[options.law as keyof typeof LAW_TEMPERING] ?? null;
	return TEMPERING_FLAGS.reduce(
		(acc, flag) => {
			if (flag !== allowed) acc[flag] = false;
			return acc;
		},
		{ ...options }
	);
};

export const setOptions = (state: CultivatorState, options: BodyOptions): CultivatorState => ({
	...state,
	options: normalizeOptions(options)
});
