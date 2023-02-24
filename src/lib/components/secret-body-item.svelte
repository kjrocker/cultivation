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
	$: selected = $selectedStore.secretBody === name;
	$: completed = !!$completeSecretBodiesStore[body.Name];
</script>

<div
	class="py-2 px-1 border-y-8 cursor-pointer hover:bg-gray-100 h-full"
	class:selected
	class:completed
	on:click={() => {
		selectedStore.toggleSecretBody(body.Name);
		selectedStore.update((v) => ({ ...v, bodyPart: overlappingNames[0] ?? undefined }));
	}}
>
	<Tooltip class="h-full w-full">
		<svelte:fragment slot="tooltip">
			<PropertyTooltip {properties} {modifiers} level={1} />
		</svelte:fragment>
		<span class="w-full h-full">
			{body.DisplayName}
		</span>
	</Tooltip>
</div>

<style>
	.selected {
		/* slate-200 */
		background-color: rgb(226 232 240);
		border-bottom-color: rgb(51 65 85);
		border-top-color: rgb(51 65 85);
	}
	.selected:hover {
		/* slate-200 */
		background-color: rgb(203 213 225);
	}
	.completed {
		border-bottom-color: rgb(74 222 128);
		border-top-color: rgb(74 222 128);
	}
	.completed.selected {
		border-bottom-color: darkgreen;
		border-top-color: darkgreen;
	}
</style>
