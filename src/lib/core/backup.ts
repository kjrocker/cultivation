import type { SpeciesKeys } from '$lib/data/species';
import type { BodyLaw, BodyPart, LabelView, SecretBody } from '$lib/data/types';
import type { DataView } from '$lib/data/util/create-data-table';
import { invertObj, mapObjIndexed, pipe } from 'ramda';
import { isNonEmptyArray, omitBy, renameKeys, renameKeysWith } from 'ramda-adjunct';
import { createDefaultState } from './defaults';
import { initParts, mergePartLabels, setOptions } from './state';
import type {
	BodyOptions,
	CultivatorState,
	EquippedSecretBodies,
	GameData,
	PartLabelCount,
	PartLabelCounts
} from './types';

export type MinifiedOptions = MinifiedOptionsV1 | MinifiedOptionsV2;

export type MinifiedOptionsV1 = {
	options: BodyOptions;
	labels: Record<string, [string, number][]>;
};

export type MinifiedOptionsV2 = {
	v: 2;
	o: {
		h: boolean;
		s: boolean;
		b: boolean;
		f: boolean;
		i: boolean;
		t: boolean;
		l: number;
		sp: SpeciesKeys;
		n: string;
	};
	l: Record<number, number[]>;
	e: { o: number[]; d: number[]; e: number[] };
};

/**
 * Drafted to carry per-label levels, which V2 discards. Not written or read yet —
 * see the `Level: MaxLevel` note in core/state.ts.
 */
export type MinifiedOptionsV3 = {
	v: 3;
	o: MinifiedOptionsV2['o'];
	// Part Labels: Record<partId, (labelId | [labelId, labelCount])[]>
	l: Record<number, (number | [number, number])[]>;
	e: MinifiedOptionsV2['e'];
};

const OptionsKeyMap = {
	temperedHeart: 'h',
	temperedSpine: 's',
	temperedBrain: 'b',
	fireSpine: 'f',
	illusionBrain: 'i',
	transcendantHeart: 't',
	law: 'l',
	species: 'sp',
	name: 'n'
};

export const shrinkOptions = (
	laws: DataView<BodyLaw>,
	options: BodyOptions
): MinifiedOptionsV2['o'] => {
	return pipe(
		(opts) => ({ ...opts, law: laws.keys.indexOf(opts.law) }),
		renameKeys(OptionsKeyMap)
	)(options) as any;
};

export const expandOptions = (
	laws: DataView<BodyLaw>,
	options: MinifiedOptionsV2['o']
): BodyOptions => {
	return pipe(
		(opts) => ({ ...opts, law: laws.keys[opts.l] }),
		renameKeys(invertObj(OptionsKeyMap))
	)(options) as any;
};

export const shrinkPartLabels = (
	partLabels: PartLabelCounts,
	labels: DataView<LabelView>,
	bodyParts: DataView<BodyPart>
): MinifiedOptionsV2['l'] => {
	return pipe(
		// @ts-expect-error I ain't gotta explain shit
		omitBy((v) => !isNonEmptyArray(v)),
		mapObjIndexed((plabels: PartLabelCount[], k) =>
			plabels.map((l) => labels.keys.indexOf(l.Name))
		),
		renameKeysWith((k) => bodyParts.keys.indexOf(k).toString())
	)(partLabels) as any;
};

export const expandPartLabels = (
	partLabels: MinifiedOptionsV2['l'],
	labels: DataView<LabelView>,
	bodyParts: DataView<BodyPart>
): PartLabelCounts => {
	const lookupLabel = (l: number): PartLabelCount => {
		const label = labels.map[labels.keys[l]];
		return { Name: label.Name, Level: label.MaxLevel, MaxLevel: label.MaxLevel };
	};
	const mapped = mapObjIndexed(
		(plabels: number[]): PartLabelCount[] => plabels.map((l) => lookupLabel(l)),
		partLabels
	);
	return renameKeysWith((k) => bodyParts.keys[Number.parseInt(k)], mapped) as any;
};

export const shrinkEquippedBodies = (
	equipped: EquippedSecretBodies,
	bodies: DataView<SecretBody>
) => {
	return {
		o: equipped.offensive.map((b) => bodies.keys.indexOf(b)),
		d: equipped.defensive.map((b) => bodies.keys.indexOf(b)),
		e: equipped.effective.map((b) => bodies.keys.indexOf(b))
	};
};

export const expandEquippedBodies = (
	equipped: MinifiedOptionsV2['e'],
	bodies: DataView<SecretBody>
): EquippedSecretBodies => {
	return {
		offensive: equipped.o.map((b) => bodies.keys[b]),
		defensive: equipped.d.map((b) => bodies.keys[b]),
		effective: equipped.e.map((b) => bodies.keys[b])
	};
};

export const isVersion1 = (build: MinifiedOptions): build is MinifiedOptionsV1 =>
	Object.keys(build).includes('options');

export const isVersion2 = (build: MinifiedOptions): build is MinifiedOptionsV2 =>
	!isVersion1(build) && build.v === 2;

/** The whole user state as a backup blob. Values are indices into the DataView keys. */
export const captureState = (data: GameData, state: CultivatorState): MinifiedOptionsV2 => ({
	v: 2,
	o: shrinkOptions(data.bodyLaws, state.options),
	l: shrinkPartLabels(state.partLabels, data.labels, data.bodyParts),
	e: shrinkEquippedBodies(state.equipped, data.secretBodies)
});

/** A restored build starts from the default state: only what the blob encodes survives. */
const restoreInto = (
	data: GameData,
	options: BodyOptions,
	labels: PartLabelCounts
): CultivatorState => {
	const state = setOptions(createDefaultState(), options);
	return mergePartLabels(initParts(state, data.bodyParts.species[options.species]), labels);
};

/** Rebuilds a whole cultivator from a backup blob. Throws on a version it cannot read. */
export const restoreState = (data: GameData, build: MinifiedOptions): CultivatorState => {
	if (isVersion1(build)) {
		const labels = mapObjIndexed(
			(part: [string, number][]) => part.map(([Name, Level]) => ({ Name, Level, MaxLevel: Level })),
			build.labels
		);
		return restoreInto(data, build.options, labels);
	}
	if (isVersion2(build)) {
		const options = expandOptions(data.bodyLaws, build.o);
		return {
			...restoreInto(data, options, expandPartLabels(build.l, data.labels, data.bodyParts)),
			equipped: expandEquippedBodies(build.e, data.secretBodies)
		};
	}
	throw new Error(
		`Unsupported cultivator backup version: ${JSON.stringify((build as { v: unknown }).v)}`
	);
};
