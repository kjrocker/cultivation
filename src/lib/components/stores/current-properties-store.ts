import { labelStore, type LabelView } from '$lib/data/get-labels';
import type { PartProperty } from '$lib/util/part-properties';
import { last, map, mapObjIndexed } from 'ramda';
import { derived, type Readable } from 'svelte/store';
import { completeSecretBodiesStore } from './complete-secret-bodies-store';
import { partLabelCountStore, type PartLabelCount } from './part-label-count-store';
import { currentSecretBodyStore } from './secret-bodies-store';

export type SecretBodyPropertyStore = Readable<PartProperty[]>;
export type PartPropertyStore = Readable<Record<string, PartProperty[]>>;

export const partPropertyStore: PartPropertyStore = derived(
	[labelStore, partLabelCountStore],
	([labels, partLabels]) => {
		const mapLabels = map((labelCount: PartLabelCount): PartProperty[] => {
			const level = labelCount.Level;
			const label: LabelView = labels.map[labelCount.Name];
			const properties = label.SuperPartProperties?.flatMap((prop) => ({
				Name: prop.Name,
				AddV: (prop.AddV ?? 0) * level,
				AddP: (prop.AddP ?? 0) * level,
				BAddV: (prop.BAddV ?? 0) * level
			})).filter((v) => v) as PartProperty[];
			return properties;
		});
		return mapObjIndexed((list) => mapLabels(list).flat(), partLabels);
	}
);

export const secretBodyPropertyStore: SecretBodyPropertyStore = derived(
	[currentSecretBodyStore, completeSecretBodiesStore],
	([body, completeSecretBodies]) => {
		if (completeSecretBodies[body?.Name ?? '']) return [];
		return last(body?.Levels ?? [])?.SuperPartProperties ?? [];
	}
);
