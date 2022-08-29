import { secretBodyStore } from '$lib/data/stores';
import {
	getAllModifierGroups,
	getSecretBodiesPropertyGroups
} from '$lib/util/get-all-modifier-groups';
import { calculatePropertyItem } from '$lib/util/total-property-item';
import { derived } from 'svelte/store';
import { partModifierStore, secretBodyModifierStore } from './current-modifiers-store';
import { partPropertyStore } from './current-properties-store';
import { equippedSecretBodyStore } from './equipped-secret-bodies-store';

export const qiRecoveryStore = derived(
	[
		secretBodyModifierStore,
		partModifierStore,
		secretBodyStore,
		equippedSecretBodyStore,
		partPropertyStore
	],
	([bodyModifiers, partModifiers, secretBodies, equippedBodies, partProperties]) => {
		const modifiers = getAllModifierGroups(bodyModifiers, partModifiers);
		const bodies = [
			...equippedBodies.offensive,
			...equippedBodies.defensive,
			...equippedBodies.effective
		].map((bodyName) => secretBodies.map[bodyName]);
		const properties = getSecretBodiesPropertyGroups(bodies, partProperties);
		return {
			globalRecovery: calculatePropertyItem(modifiers['BodyPratice_RecoverZhenQi']),
			equippedRecovery: calculatePropertyItem(properties['RecoverQi']),
			equippedCost: calculatePropertyItem(properties['FightCost'])
		};
	}
);
