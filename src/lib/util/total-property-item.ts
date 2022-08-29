import { clamp } from 'ramda';
import type { PartProperty } from '../data/types';
import { undefinedSum } from './undefined-sum';

interface PropertyConfig {
	max?: number;
	min?: number;
	base?: number;
	gAddP?: number;
	gAddV?: number;
}

const DefaultConfig: Required<PropertyConfig> = {
	max: Infinity,
	min: -Infinity,
	base: 0,
	gAddP: 0,
	gAddV: 0
};

export const calculatePropertyItem = <Config extends PropertyConfig>(
	prop?: PartProperty,
	partialConfig?: Config
) => {
	const config: Required<PropertyConfig> = { ...DefaultConfig, ...partialConfig };
	const baseValue = undefinedSum(config.base, prop?.BAddV);
	const percentBonus = undefinedSum(1, prop?.AddP);
	const bonusValue = prop?.AddV ?? 0;
	const total =
		baseValue * percentBonus * (1 + (config?.gAddP ?? 0)) + bonusValue + (config?.gAddV ?? 0);
	const clamped = clamp(config.min, config.max, total);
	return { baseValue, percentBonus, bonusValue, total: clamped };
};
