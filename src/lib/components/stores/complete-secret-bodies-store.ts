import { secretBodyStore } from '$lib/data/get-secret-bodies';
import { isWholeBodyComplete } from '$lib/util/is-body-complete';
import { mapObjIndexed } from 'ramda';
import { derived } from 'svelte/store';
import { partLabelStore } from './part-label-store';

export const completeSecretBodiesStore = derived(
	[secretBodyStore, partLabelStore],
	([secretBodies, partLabels]) => {
		return mapObjIndexed((body) => isWholeBodyComplete(body, partLabels), secretBodies.map);
	}
);
