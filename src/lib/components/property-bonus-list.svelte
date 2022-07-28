<script lang="ts">
	import type { SecretBody } from '$lib/data/get-secret-bodies';
	import type { PartProperty } from '$lib/util/part-properties';
	import { undefinedSum } from '$lib/util/undefined-sum';
	import { groupBy, mapObjIndexed, pipe } from 'ramda';
	import BonusListItem from './property-bonus-list-item.svelte';
	import { completeSecretBodiesStore } from './stores/complete-secret-bodies-store';
	import { partPropertyStore, secretBodyPropertyStore } from './stores/current-properties-store';
	import { currentSecretBodyStore } from './stores/secret-bodies-store';

	const getPropertyGroups = (
		body: SecretBody,
		bodyProps: PartProperty[],
		partProps: Record<string, PartProperty[]>
	): Record<string, PartProperty> => {
		const partProperties = body.Parts.flatMap((part) => partProps[part.Name]);
		const allProperties = [...partProperties, ...bodyProps].filter((v) => v);
		return pipe(
			groupBy<PartProperty, string>((v) => v.Name),
			mapObjIndexed(
				(list: PartProperty[]): PartProperty =>
					list.reduce((acc, next) => {
						return {
							...acc,
							BAddV: undefinedSum(acc.BAddV, next.BAddV),
							AddP: undefinedSum(acc.AddP, next.AddP),
							AddV: undefinedSum(acc.AddV, next.AddV)
						};
					})
			)
		)(allProperties);
	};

	$: propertyGroups =
		$currentSecretBodyStore && $completeSecretBodiesStore[$currentSecretBodyStore.Name]
			? getPropertyGroups($currentSecretBodyStore, $secretBodyPropertyStore, $partPropertyStore)
			: {};
</script>

<div class="border rounded-md my-2">
	<BonusListItem name="AtkPower" displayName="Attack" bonuses={propertyGroups['AtkPower']} />
	<BonusListItem name="DefPower" displayName="Defense" bonuses={propertyGroups['DefPower']} />
	<BonusListItem
		name="AtkRate"
		displayName="Attack Rate"
		bonuses={propertyGroups['AtkRate']}
		max={0.95}
		percentage
	/>
	<BonusListItem
		name="DefRate"
		displayName="Defense Rate"
		bonuses={propertyGroups['DefRate']}
		max={0.95}
		percentage
	/>
	<hr />
	<BonusListItem
		name="ArmorPenetration"
		displayName="Armor Penetration"
		bonuses={propertyGroups['ArmorPenetration']}
	/>
	<BonusListItem
		name="CatchFabao"
		displayName="Artifact Suppression"
		bonuses={propertyGroups['CatchFabao']}
	/>
	<BonusListItem
		name="FightCost"
		displayName="Qi Consumption"
		bonuses={propertyGroups['FightCost']}
		rate
	/>
	<BonusListItem
		name="RecoverQi"
		displayName="Qi Recovery"
		bonuses={propertyGroups['RecoverQi']}
		rate
	/>
	<hr />
	<BonusListItem
		name="ResistanceJin"
		displayName="Metal Resist"
		bonuses={propertyGroups['ResistanceJin']}
		percentage
	/>
	<BonusListItem
		name="ResistanceTu"
		displayName="Earth Resist"
		bonuses={propertyGroups['ResistanceTu']}
		percentage
	/>
	<BonusListItem
		name="ResistanceShui"
		displayName="Water Resist"
		bonuses={propertyGroups['ResistanceShui']}
		percentage
	/>
	<BonusListItem
		name="ResistanceMu"
		displayName="Wood Resist"
		bonuses={propertyGroups['ResistanceMu']}
		percentage
	/>
	<BonusListItem
		name="ResistanceHuo"
		displayName="Fire Resist"
		bonuses={propertyGroups['ResistanceHuo']}
		percentage
	/>
</div>
