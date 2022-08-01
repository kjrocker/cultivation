import type { BodyOptions } from '../forms/options-store';

export type MinifiedOptions = {
	options: BodyOptions;
	labels: Record<string, [string, number][]>;
};
