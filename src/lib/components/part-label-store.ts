import type { LabelView } from '$lib/data/get-labels';
import { uniqBy } from 'ramda';
import { writable } from 'svelte/store';

export type PartLabelStore = Record<string, LabelView[]>;

const createPartLabelStore = () => {
	const { subscribe, set, update } = writable<PartLabelStore>({});

	return {
		subscribe,
		reset: () => set({}),
		update: (name: string, labels: LabelView[]) => {
			return update((old) => {
				old[name] = labels;
				return old;
			});
		},
		append: (name: string, labels: LabelView[]) => {
			return update((old) => {
				old[name] = uniqBy((l) => l.Name, [...(old[name] ?? []), ...labels]);
				return old;
			});
		},
		set
	};
};

export const partLabelStore = createPartLabelStore();
