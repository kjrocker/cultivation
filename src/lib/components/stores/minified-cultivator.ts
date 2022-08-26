import type { BodyOptions } from './options-store';

export type MinifiedOptions = {
	options: BodyOptions;
	labels: Record<string, [string, number][]>;
};
