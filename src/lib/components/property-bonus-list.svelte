<script lang="ts">
	import type { SecretBody } from '$lib/data/get-secret-bodies';
	import { PropertyConfiguration, SecretBodyProperties } from '$lib/data/property-config';
	import { sumAndGroupProperties } from '$lib/util/get-all-modifier-groups';
	import type { PartProperty } from '$lib/util/part-properties';
	import BonusListItem from './property-bonus-list-item.svelte';
	import { completeSecretBodiesStore } from './stores/complete-secret-bodies-store';
	import { partPropertyStore, secretBodyPropertyStore } from './stores/current-properties-store';
	import { selectedSecretBody } from './stores/selected-store';

	const getPropertyGroups = (
		body: SecretBody,
		bodyProps: PartProperty[],
		partProps: Record<string, PartProperty[]>
	): Record<string, PartProperty> => {
		const partProperties = body.Parts.flatMap((part) => partProps[part.Name]);
		const allProperties = [...partProperties, ...bodyProps].filter((v) => v);
		return sumAndGroupProperties(allProperties);
	};

	$: propertyGroups =
		$selectedSecretBody && $completeSecretBodiesStore[$selectedSecretBody.Name]
			? getPropertyGroups($selectedSecretBody, $secretBodyPropertyStore, $partPropertyStore)
			: {};
</script>

<div class="border rounded-md my-2">
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
</div>
