import type { LabelView } from '$lib/data/get-labels';
import { uniqBy } from 'ramda';
import { writable } from 'svelte/store';

export type PartLabelCount = { Name: string; Level: number; MaxLevel: number };

export type PartLabelCountStore = Record<string, PartLabelCount[]>;

const createPartLabelCountStore = () => {
	const { subscribe, set, update } = writable<PartLabelCountStore>({});

	const mapLabels = (l: LabelView): PartLabelCount => ({
		Name: l.Name,
		Level: l.MaxLevel,
		MaxLevel: l.MaxLevel
	});

	return {
		subscribe,
		reset: () => set({}),
		init: (names: string[]) => {
			return set(
				names.reduce((acc, name) => {
					acc[name] = [];
					return acc;
				}, {} as Record<string, []>)
			);
		},
		update: (name: string, labels: LabelView[]) => {
			const labelCounts = labels.map(mapLabels);
			return update((old) => {
				old[name] = labelCounts;
				return old;
			});
		},
		append: (name: string, labels: LabelView[]) => {
			const labelCounts = labels.map(mapLabels);
			return update((old) => {
				old[name] = uniqBy((l) => l.Name, [...(old[name] ?? []), ...labelCounts]);
				return old;
			});
		},
		set
	};
};

export const partLabelCountStore = createPartLabelCountStore();
