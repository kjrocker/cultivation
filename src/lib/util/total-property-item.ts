import { clamp } from 'ramda';
import type { PartProperty } from './part-properties';
import { undefinedSum } from './undefined-sum';

interface PropertyConfig {
	max?: number;
	min?: number;
	base?: number;
}

export const calculatePropertyItem = <Config extends PropertyConfig>(
	prop?: PartProperty,
	config?: Config
) => {
	const baseValue = undefinedSum(config?.base, prop?.BAddV);
	const percentBonus = undefinedSum(1, prop?.AddP);
	const bonusValue = prop?.AddV ?? 0;
	const total = baseValue * percentBonus + bonusValue;
	const clamped = clamp(config?.min ?? -Infinity, config?.max ?? Infinity, total);
	return { baseValue, percentBonus, bonusValue, total: clamped };
};
