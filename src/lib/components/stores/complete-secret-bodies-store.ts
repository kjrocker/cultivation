import { bodyLawStore } from '$lib/data/stores';
import { secretBodyStore } from '$lib/data/stores';
import { isWholeBodyComplete } from '$lib/util/is-body-complete';
import { mapObjIndexed } from 'ramda';
import { derived } from 'svelte/store';
import { bodyOptionsStore } from './options-store';
import { partLabelStore } from './part-label-store';

export const completeSecretBodiesStore = derived(
	[secretBodyStore, partLabelStore, bodyLawStore, bodyOptionsStore],
	([secretBodies, partLabels, laws, options]) => {
		const bodies = laws.map[options.law].SuperParts;
		return mapObjIndexed(
			(body) => bodies.includes(body.Name) && isWholeBodyComplete(body, partLabels),
			secretBodies.map
		);
	}
);
