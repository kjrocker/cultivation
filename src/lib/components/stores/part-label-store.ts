import { labelStore, type LabelView } from '$lib/data/get-labels';
import { mapObjIndexed } from 'ramda';
import { derived, type Readable } from 'svelte/store';
import { partLabelCountStore } from './part-label-count-store';

export type PartLabelStore = Record<string, LabelView[]>;

export const partLabelStore: Readable<PartLabelStore> = derived(
	[partLabelCountStore, labelStore],
	([partLabelCounts, labelStore]) => {
		return mapObjIndexed((list) => list.map((l) => labelStore.map[l.Name]), partLabelCounts);
	}
);
