import { formatNumber } from './format-number';
import type { PartProperty } from './part-properties';

export const propertyToString = <T extends PartProperty>(
	prop: T,
	level: number = 1,
	config: Partial<{ percentage: boolean; rate: boolean }>
): string => {
	if (prop.BAddV) {
		return `Base ${formatNumber(prop.BAddV * level, {
			...config,
			precision: 2,
			plusSign: true
		})}`;
	} else if (prop.AddP) {
		return formatNumber(prop.AddP * level, {
			percentage: true,
			rate: false,
			precision: 2,
			plusSign: true
		});
	} else if (prop.AddV) {
		return formatNumber(prop.AddV * level, { ...config, precision: 2, plusSign: true });
	} else {
		return `No bonus detected, how did that happen?`;
	}
};
