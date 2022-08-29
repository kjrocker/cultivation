<script lang="ts">
	import { secretBodyStore } from '$lib/data/stores';
	import { CheckCircle } from '@steeze-ui/iconic-free';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { intersection } from 'ramda';
	import Tooltip from './base/tooltip.svelte';
	import PropertyTooltip from './property-tooltip.svelte';
	import { completeSecretBodiesStore } from './stores/complete-secret-bodies-store';
	import { currentSpeciesPartsStore } from './stores/current-species-parts-store';
	import { selectedStore } from './stores/selected-store';

	export let name: string;

	$: body = $secretBodyStore.map[name];
	$: properties = body.Levels.flatMap((v) => v.SuperPartProperties);
	$: modifiers = body.Levels.map((v) => v.Modifier).filter((mod) => mod && mod !== '');
	$: overlappingNames = intersection(
		$currentSpeciesPartsStore,
		body.Parts.map((p) => p.Name)
	);
</script>

<Tooltip
	on:click={() => {
		selectedStore.toggleSecretBody(body.Name);
		selectedStore.update((v) => ({ ...v, bodyPart: overlappingNames[0] ?? undefined }));
	}}
	class={`py-4 relative px-1 text-center border-2 font-medium text-md cursor-pointer ${
		$selectedStore.secretBody === name
			? 'border-indigo-500 text-indigo-600'
			: 'border-transparent text-gray-900 hover:bg-gray-50 hover:border-gray-300'
	}`}
>
	<svelte:fragment slot="tooltip">
		<PropertyTooltip {properties} {modifiers} level={1} />
	</svelte:fragment>
	<span class="w-full h-full">
		{body.DisplayName}
	</span>{#if $completeSecretBodiesStore[body.Name]}
		<Icon class="absolute bottom-1 right-1 inline h-5 w-5 text-green-400" src={CheckCircle} />
	{/if}
</Tooltip>
