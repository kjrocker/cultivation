import type { Modifier, ModifierProperty } from '$lib/data/get-modifiers';
import { concat, pipe, groupBy, mapObjIndexed } from 'ramda';
import type { PartProperty } from './part-properties';
import { undefinedSum } from './undefined-sum';

export const sumAndGroupProperties = <T extends PartProperty>(
	list: T[]
): Record<string, Required<T>> => {
	return pipe(
		groupBy<T, string>((v) => v.Name),
		mapObjIndexed(
			(list: T[]): T =>
				list.reduce(
					(acc: T, next: T): T => {
						return {
							...acc,
							BAddV: undefinedSum(acc.BAddV, next.BAddV),
							AddP: undefinedSum(acc.AddP, next.AddP),
							AddV: undefinedSum(acc.AddV, next.AddV)
						};
					},
					{ ...list[0], BAddV: 0, AddP: 0, AddV: 0 }
				)
		)
	)(list) as unknown as Record<string, Required<T>>;
};

export const getAllModifierGroups = (
	bodyProps: Modifier[],
	partProps: Record<string, Modifier[]>
): Record<string, ModifierProperty> => {
	const partProperties = Object.values(partProps).reduce(concat, []);
	const allProperties = [...partProperties, ...bodyProps]
		.filter((v) => v && v.Properties && Array.isArray(v.Properties))
		.flatMap((v) => v.Properties);
	return sumAndGroupProperties(allProperties);
};
