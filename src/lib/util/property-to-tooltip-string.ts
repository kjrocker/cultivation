import { formatNumber } from './format-number';
import type { PartProperty } from '../data/types';
import { PropertyBlacklist } from '../data/property-config';

type PropertyToStringConfig = {
	blacklist: typeof PropertyBlacklist;
};

export const createPropertyToString =
	({ blacklist }: PropertyToStringConfig) =>
	<T extends PartProperty>(
		prop: T,
		level = 1,
		config?: Partial<{ percentage: boolean; rate: boolean }>
	): string[] => {
		let result: string[] = [];
		if (prop.BAddV && !blacklist[prop.Name]?.BAddV) {
			result.push(
				`Base ${formatNumber(prop.BAddV * level, {
					...config,
					precision: 2,
					plusSign: true
				})}`
			);
		}
		if (prop.AddP && !blacklist[prop.Name]?.AddP) {
			result.push(
				formatNumber(prop.AddP * level, {
					percentage: true,
					rate: false,
					precision: 2,
					plusSign: true
				})
			);
		}
		if (prop.AddV && !blacklist[prop.Name]?.AddV) {
			result.push(formatNumber(prop.AddV * level, { ...config, precision: 2, plusSign: true }));
		}
		return result;
	};

export const propertyToString = createPropertyToString({ blacklist: PropertyBlacklist });
