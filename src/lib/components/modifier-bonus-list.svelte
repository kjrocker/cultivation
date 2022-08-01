<script lang="ts">
	import { PropertyConfiguration } from '$lib/data/property-config';
	import { getAllModifierGroups } from '$lib/util/get-all-modifier-groups';
	import PropertyBonusListItem from './property-bonus-list-item.svelte';
	import { partModifierStore, secretBodyModifierStore } from './stores/current-modifiers-store';

	$: groups = getAllModifierGroups($secretBodyModifierStore, $partModifierStore);
</script>

<div class="border rounded-md my-2">
	{#each Object.keys(groups) as name}
		<PropertyBonusListItem
			{name}
			displayName={`${groups[name].DisplayName ?? PropertyConfiguration[name]?.DisplayName ?? name}`}
			bonuses={groups[name]}
			percentage={!!PropertyConfiguration[name]?.percentage}
			rate={!!PropertyConfiguration[name]?.rate}
		/>
	{/each}
</div>
