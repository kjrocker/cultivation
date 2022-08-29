import { getAllModifierGroups } from '$lib/util/get-all-modifier-groups';
import { calculatePropertyItem } from '$lib/util/total-property-item';
import { derived } from 'svelte/store';
import { partModifierStore, secretBodyModifierStore } from './current-modifiers-store';

export const globalPercentageBonusStore = derived(
	[secretBodyModifierStore, partModifierStore],
	([bodyModifiers, partModifiers]) => {
		const modifiers = getAllModifierGroups(bodyModifiers, partModifiers);
		return {
			AtkPower: calculatePropertyItem(modifiers['BodyPractice_SuperPartAddp_AtkPower']),
			DefPower: calculatePropertyItem(modifiers['BodyPractice_SuperPartAddp_DefPower']),
			AtkRate: calculatePropertyItem(modifiers['BodyPractice_SuperPartAddp_AtkRate']),
			DefRate: calculatePropertyItem(modifiers['BodyPractice_SuperPartAddp_DefRate']),
			CatchFabao: calculatePropertyItem(modifiers['BodyPractice_SuperPartAddp_CatchFabao']),
			ArmorPenetration: calculatePropertyItem(
				modifiers['BodyPractice_SuperPartAddp_ArmorPenetration']
			)
		};
	}
);

export const globalValueBonusStore = derived(
	[
		secretBodyModifierStore,
		partModifierStore
		// secretBodyStore,
		// equippedSecretBodyStore,
		// partPropertyStore
	],
	([bodyModifiers, partModifiers]) => {
		const modifiers = getAllModifierGroups(bodyModifiers, partModifiers);
		// const bodies = [
		// 	...equippedBodies.offensive,
		// 	...equippedBodies.defensive,
		// 	...equippedBodies.effective
		// ].map((bodyName) => secretBodies.map[bodyName]);
		// const properties = getSecretBodiesPropertyGroups(bodies, partProperties);
		return {
			AtkPower: calculatePropertyItem(modifiers['BodyPractice_SuperPartAddv_AtkPower']),
			DefPower: calculatePropertyItem(modifiers['BodyPractice_SuperPartAddv_DefPower']),
			AtkRate: calculatePropertyItem(modifiers['BodyPractice_SuperPartAddv_AtkRate']),
			DefRate: calculatePropertyItem(modifiers['BodyPractice_SuperPartAddv_DefRate']),
			CatchFabao: calculatePropertyItem(modifiers['BodyPractice_SuperPartAddv_CatchFabao']),
			ArmorPenetration: calculatePropertyItem(
				modifiers['BodyPractice_SuperPartAddv_ArmorPenetration']
			)
		};
	}
);
