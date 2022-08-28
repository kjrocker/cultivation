<script lang="ts">
	import { PropertyConfiguration, SecretBodyProperties } from '$lib/data/property-config';
	import { getSecretBodyPropertyGroups } from '$lib/util/get-all-modifier-groups';
	import Collapse from './base/collapse.svelte';
	import Panel from './base/panel.svelte';
	import BonusListItem from './property-bonus-list-item.svelte';
	import { completeSecretBodiesStore } from './stores/complete-secret-bodies-store';
	import { partPropertyStore } from './stores/current-properties-store';
	import { selectedSecretBody } from './stores/selected-store';

	$: propertyGroups =
		$selectedSecretBody && $completeSecretBodiesStore[$selectedSecretBody.Name]
			? getSecretBodyPropertyGroups($selectedSecretBody, $partPropertyStore)
			: {};
</script>

<Panel>
	<Collapse defaultOpen buttonClasses="py-2 text-lg px-2 w-full justify-between">
		<slot slot="header">Secret Body</slot>
		<hr />
		{#each SecretBodyProperties as name}
			<BonusListItem
				{name}
				displayName={PropertyConfiguration[name].DisplayName ?? name}
				bonuses={propertyGroups[name]}
				{...PropertyConfiguration[name] ?? {}}
			/>
			{#if name === 'DefRate' || name === 'RecoverQi'}
				<hr />
			{/if}
		{/each}
	</Collapse>
</Panel>
