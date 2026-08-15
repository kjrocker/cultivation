<script lang="ts">
	import { PropertyConfiguration } from '$lib/data/property-config';
	import { getAllModifierGroups } from '$lib/util/get-all-modifier-groups';
	import Collapse from './base/collapse.svelte';
	import Panel from './base/panel.svelte';
	import PropertyBonusListItem from './property-bonus-list-item.svelte';
	import { partModifierStore, secretBodyModifierStore } from '$lib/stores';

	$: groups = getAllModifierGroups($secretBodyModifierStore, $partModifierStore);
</script>

<Panel>
	<Collapse buttonClasses="py-2 text-lg px-2 w-full justify-between">
		<slot slot="header">All Modifiers</slot>
		<hr />
		{#each Object.keys(groups) as name}
			<PropertyBonusListItem
				{name}
				displayName={`${
					groups[name].DisplayName ?? PropertyConfiguration[name]?.DisplayName ?? name
				}`}
				bonuses={groups[name]}
				percentage={!!PropertyConfiguration[name]?.percentage}
				rate={!!PropertyConfiguration[name]?.rate}
			/>
		{/each}
	</Collapse>
</Panel>
