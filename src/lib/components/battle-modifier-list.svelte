<script lang="ts">
	import { PropertyConfiguration } from '$lib/data/property-config';

	import { getAllModifierGroups } from '$lib/util/get-all-modifier-groups';

	import Collapse from './base/collapse.svelte';
	import Panel from './base/panel.svelte';
	import PropertyBonusListItem from './property-bonus-list-item.svelte';
	import QiRecovery from './qi-recovery.svelte';
	import { partModifierStore, secretBodyModifierStore } from './stores/current-modifiers-store';

	const groupList = {
		BodyPratice_MaxZhenQi: 'Max True Qi',
		NpcFight_BaseDodgeChance: 'Global Dodge',
		BodyPratice_BodyStrong: 'Body Strength'
	};

	$: groups = getAllModifierGroups($secretBodyModifierStore, $partModifierStore);
</script>

<Panel>
	<Collapse defaultOpen buttonClasses="py-2 text-lg px-2 w-full justify-between">
		<slot slot="header">Battle Stats</slot>
		<hr />
		{#each Object.entries(groupList) as [name, displayName]}
			<PropertyBonusListItem
				{name}
				{displayName}
				bonuses={groups[name]}
				percentage={!!PropertyConfiguration[name]?.percentage}
				rate={!!PropertyConfiguration[name]?.rate}
				tooltip={false}
			/>
		{/each}
		<QiRecovery class="mx-2 py-1 cursor-default" />
	</Collapse>
</Panel>
