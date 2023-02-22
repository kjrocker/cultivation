import { formatNumber } from './format-number';
import type { PartProperty } from '../data/types';

export const propertyToString = <T extends PartProperty>(
	prop: T,
	level = 1,
	config?: Partial<{ percentage: boolean; rate: boolean }>
): string[] => {
	let result: string[] = [];
	if (prop.BAddV) {
		result.push(
			`Base ${formatNumber(prop.BAddV * level, {
				...config,
				precision: 2,
				plusSign: true
			})}`
		);
	}
	if (prop.AddP) {
		result.push(
			formatNumber(prop.AddP * level, {
				percentage: true,
				rate: false,
				precision: 2,
				plusSign: true
			})
		);
	}
	if (prop.AddV) {
		result.push(formatNumber(prop.AddV * level, { ...config, precision: 2, plusSign: true }));
	}
	if (result.length === 0) {
		result.push(`No bonus detected, how did that happen?`);
	}
	return result;
};
