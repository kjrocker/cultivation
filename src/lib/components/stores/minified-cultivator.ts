import type { SpeciesKeys } from '$lib/data/species';
import type { BodyOptions } from '../forms/options-store';
import type { PartLabelCount } from './part-label-count-store';

export type MinifiedOptions = {
	options: BodyOptions;
	labels: Record<string, [string, number][]>;
};
