import type { PartProperty } from './part-properties';

export const propertyToString = <T extends PartProperty>(prop: T, level: number = 1): string => {
	if (prop.BAddV) {
		return `Base ${prop.BAddV < 0 ? '' : '+'}${prop.BAddV * level}`;
	} else if (prop.AddP) {
		return `${prop.AddP < 0 ? '' : '+'}${prop.AddP * level * 100}%`;
	} else if (prop.AddV) {
		return `${prop.AddV < 0 ? '' : '+'}${prop.AddV * level}`;
	} else {
		return `No bonus detected, how did that happen?`;
	}
};
