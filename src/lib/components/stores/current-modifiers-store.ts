import { labelStore } from '$lib/data/get-labels';
import { modifierStore, type Modifier } from '$lib/data/get-modifiers';
import { secretBodyStore, type SecretBody } from '$lib/data/get-secret-bodies';
import { filter, isEmpty, last, map, mapObjIndexed } from 'ramda';
import { derived, type Readable } from 'svelte/store';
import { completeSecretBodiesStore } from './complete-secret-bodies-store';
import { partLabelCountStore, type PartLabelCount } from './part-label-count-store';

export type SecretBodyModiferStore = Readable<Modifier[]>;
export type PartModifierStore = Readable<Record<string, Modifier[]>>;

const getBodyModifiers = (body: SecretBody): string[] => {
	const bodyModifier = last(body?.Levels ?? [])?.Modifier;
	return [bodyModifier].filter((v) => v) as string[];
};

export const partModifierStore: PartModifierStore = derived(
	[modifierStore, labelStore, partLabelCountStore],
	([modifiers, labels, partLabels]) => {
		const mapLabels = map((labelCount: PartLabelCount): Modifier | undefined => {
			const level = labelCount.Level;
			const modifierName = labels.map[labelCount.Name].Modifier;
			if (!modifierName || isEmpty(modifierName)) return undefined;
			const modifier = modifiers.map[modifierName];
			const properties = modifier.Properties.flatMap((prop) => ({
				...prop,
				AddV: (prop.AddV ?? 0) * level,
				AddP: (prop.AddP ?? 0) * level,
				BAddV: (prop.BAddV ?? 0) * level
			}));
			return { ...modifier, Properties: properties };
		});
		return mapObjIndexed((list) => mapLabels(list).filter((v) => v) as Modifier[], partLabels);
	}
);

export const secretBodyModifierStore: SecretBodyModiferStore = derived(
	[modifierStore, secretBodyStore, completeSecretBodiesStore],
	([modifiers, secretBodies, completeSecretBodies]) => {
		const completed: string[] = Object.keys(filter((v) => v, completeSecretBodies))
			.map((name) => secretBodies.map[name])
			.filter((v) => v)
			.flatMap((v) => getBodyModifiers(v));
		return completed.map((v) => modifiers.map[v]).filter((v) => v);
	}
);
