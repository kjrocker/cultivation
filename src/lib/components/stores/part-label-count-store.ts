import type { LabelView } from '$lib/data/types';
import { pickBy, uniqBy } from 'ramda';
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
		setParts: (names: string[]) => {
			return update((old) => {
				const trimmed: PartLabelCountStore = pickBy((val, key) => names.includes(key), old);
				return names.reduce((acc, name) => {
					if (Array.isArray(acc[name])) {
						return acc;
					} else {
						acc[name] = [];
						return acc;
					}
				}, trimmed as Record<string, []>);
			});
		},
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
		merge: (counts: Record<string, PartLabelCount[]>) => {
			return update((old) => ({ ...old, ...counts }));
		},
		set
	};
};

export const partLabelCountStore = createPartLabelCountStore();
