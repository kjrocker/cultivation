import type { SpeciesKeys } from '$lib/data/species';
import type { BodyOptions } from './options-store';

export type MinifiedOptions = MinifiedOptionsV1 | MinifiedOptionsV2;

export type MinifiedOptionsV1 = {
	options: BodyOptions;
	labels: Record<string, [string, number][]>;
};

export type MinifiedOptionsV2 = {
	v: 2;
	o: {
		h: boolean;
		s: boolean;
		b: boolean;
		f: boolean;
		i: boolean;
		t: boolean;
		l: number;
		sp: SpeciesKeys;
		n: string;
	};
	l: Record<number, number[]>;
	e: { o: number[]; d: number[]; e: number[] };
};
