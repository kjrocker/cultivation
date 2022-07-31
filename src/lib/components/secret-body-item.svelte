<script lang="ts">
	import { secretBodyStore } from '$lib/data/get-secret-bodies';
	import { last } from 'ramda';
	import Tooltip from './base/tooltip.svelte';
	import PropertyTooltip from './property-tooltip.svelte';
	import { selectedStore } from './stores/selected-store';

	export let name: string;

	$: body = $secretBodyStore.map[name];
	$: properties = body.Levels.flatMap((v) => v.SuperPartProperties);
	$: modifiers = body.Levels.map((v) => v.Modifier).filter((mod) => mod && mod !== '');
</script>

<Tooltip
	on:click={() => {
		selectedStore.toggleSecretBody(body.Name);
		selectedStore.update((v) => ({ ...v, bodyPart: body.Parts[0].Name }));
	}}
	class={`py-4 px-1 text-center border-2 font-medium text-md cursor-pointer ${
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
	</span>
</Tooltip>
