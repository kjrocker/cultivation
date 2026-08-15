import type { Modifier, PartProperty, SecretBody } from '$lib/data/types';
import {
	getAllModifierGroups,
	getSecretBodiesPropertyGroups,
	getSecretBodyPropertyGroups
} from '$lib/util/get-all-modifier-groups';
import { isWholeBodyComplete } from '$lib/util/is-body-complete';
import { calculatePropertyItem, type PropertyItem } from '$lib/util/total-property-item';
import { filter, fromPairs, last, mapObjIndexed } from 'ramda';
import { GLOBAL_BONUS_PROPS, type GlobalBonusProp } from './defaults';
import { selectSecretBody } from './select';
import type {
	ComputedCultivator,
	CultivatorState,
	EquippedSecretBodies,
	GameData,
	PartLabelCounts,
	PartLabels
} from './types';

/** Label and modifier properties scale linearly with the label's level. */
export const scaleProperties = <T extends PartProperty>(
	properties: T[] | undefined,
	level: number
): T[] =>
	properties?.map((prop) => ({
		...prop,
		AddV: (prop.AddV ?? 0) * level,
		AddP: (prop.AddP ?? 0) * level,
		BAddV: (prop.BAddV ?? 0) * level
	})) ?? [];

const getBodyModifiers = (body: SecretBody): string[] =>
	[last(body?.Levels ?? [])?.Modifier].filter((v) => v) as string[];

const resolvePartLabels = (data: GameData, counts: PartLabelCounts): PartLabels =>
	mapObjIndexed((list) => list.map((l) => data.labels.map[l.Name]), counts);

const computeCompleteSecretBodies = (
	data: GameData,
	law: string,
	partLabels: PartLabels
): Record<string, boolean> => {
	const bodies = data.bodyLaws.map[law].SuperParts;
	return mapObjIndexed(
		(body) => bodies.includes(body.Name) && isWholeBodyComplete(body, partLabels),
		data.secretBodies.map
	);
};

const computePartModifiers = (
	data: GameData,
	counts: PartLabelCounts
): Record<string, Modifier[]> =>
	mapObjIndexed(
		(list) =>
			list
				.flatMap((labelCount) => {
					const modifierList = data.labels.map[labelCount.Name].Modifier;
					if (!modifierList || modifierList.length === 0) return [];
					return modifierList.map((modifierName) => {
						const modifier = data.modifiers.map[modifierName];
						return {
							...modifier,
							Properties: scaleProperties(modifier?.Properties, labelCount.Level)
						};
					});
				})
				.filter((v) => v),
		counts
	);

const computeSecretBodyModifiers = (
	data: GameData,
	completeSecretBodies: Record<string, boolean>
): Modifier[] =>
	Object.keys(filter((v) => v, completeSecretBodies))
		.map((name) => data.secretBodies.map[name])
		.filter((v) => v)
		.flatMap((v) => getBodyModifiers(v))
		.map((v) => data.modifiers.map[v])
		.filter((v) => v);

const computePartProperties = (
	data: GameData,
	counts: PartLabelCounts
): Record<string, PartProperty[]> =>
	mapObjIndexed(
		(list) =>
			list.flatMap((labelCount) =>
				scaleProperties(data.labels.map[labelCount.Name].SuperPartProperties, labelCount.Level)
			),
		counts
	);

const computeGlobalBonus = (
	modifiers: Record<string, PartProperty>,
	kind: 'Addp' | 'Addv'
): Record<GlobalBonusProp, PropertyItem> =>
	fromPairs(
		GLOBAL_BONUS_PROPS.map((prop) => [
			prop,
			calculatePropertyItem(modifiers[`BodyPractice_SuperPart${kind}_${prop}`])
		])
	) as Record<GlobalBonusProp, PropertyItem>;

const equippedBodies = (data: GameData, equipped: EquippedSecretBodies): SecretBody[] =>
	[...equipped.offensive, ...equipped.defensive, ...equipped.effective].map(
		(name) => data.secretBodies.map[name]
	);

export const computeCultivator = (data: GameData, state: CultivatorState): ComputedCultivator => {
	const { options, partLabels: counts, equipped } = state;

	const partLabels = resolvePartLabels(data, counts);
	const completeSecretBodies = computeCompleteSecretBodies(data, options.law, partLabels);
	const partModifiers = computePartModifiers(data, counts);
	const secretBodyModifiers = computeSecretBodyModifiers(data, completeSecretBodies);
	const partProperties = computePartProperties(data, counts);

	// One pass, shared by both global bonus tables and the qi balance.
	const modifierGroups = getAllModifierGroups(secretBodyModifiers, partModifiers);
	const equippedProperties = getSecretBodiesPropertyGroups(
		equippedBodies(data, equipped),
		partProperties
	);

	const selectedBody = selectSecretBody(data, state);
	const isSelectedComplete = !!selectedBody && completeSecretBodies[selectedBody.Name];

	return {
		speciesParts: data.bodyParts.species[options.species],
		partLabels,
		completeSecretBodies,
		partModifiers,
		secretBodyModifiers,
		partProperties,
		secretBodyProperties: isSelectedComplete
			? []
			: last(selectedBody?.Levels ?? [])?.SuperPartProperties ?? [],
		selectedBodyPropertyGroups:
			selectedBody && isSelectedComplete
				? getSecretBodyPropertyGroups(selectedBody, partProperties)
				: {},
		globalPercentageBonus: computeGlobalBonus(modifierGroups, 'Addp'),
		globalValueBonus: computeGlobalBonus(modifierGroups, 'Addv'),
		qiRecovery: {
			globalRecovery: calculatePropertyItem(modifierGroups['BodyPratice_RecoverZhenQi']),
			equippedRecovery: calculatePropertyItem(equippedProperties['RecoverQi']),
			equippedCost: calculatePropertyItem(equippedProperties['FightCost'])
		}
	};
};
