import type { BodyLaw, BodyPart, LabelView, SecretBody } from '$lib/data/types';
import type { DataView } from '$lib/data/util/create-data-table';
import { invertObj, mapObjIndexed, pipe } from 'ramda';
import { isNonEmptyArray, omitBy, renameKeys, renameKeysWith } from 'ramda-adjunct';
import type { EquippedSecretBodyStore } from '../stores/equipped-secret-bodies-store';
import type { MinifiedOptionsV2 } from '../stores/minified-cultivator';
import type { BodyOptions } from '../stores/options-store';
import type { PartLabelCount, PartLabelCountStore } from '../stores/part-label-count-store';

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
	partLabels: PartLabelCountStore,
	labels: DataView<LabelView>,
	bodyParts: DataView<BodyPart>
): MinifiedOptionsV2['l'] => {
	return pipe(
		// @ts-expect-error
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
): Record<string, PartLabelCount[]> => {
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
	equipped: EquippedSecretBodyStore,
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
): EquippedSecretBodyStore => {
	return {
		offensive: equipped.o.map((b) => bodies.keys[b]),
		defensive: equipped.d.map((b) => bodies.keys[b]),
		effective: equipped.e.map((b) => bodies.keys[b])
	};
};
