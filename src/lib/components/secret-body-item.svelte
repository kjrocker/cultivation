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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="py-2 px-1 border-y-8 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
	class:selected
	class:completed
	on:click={() => {
		selectedStore.toggleSecretBody(body.Name);
		selectedStore.update((v) => ({ ...v, bodyPart: overlappingNames[0] ?? undefined }));
	}}
>
	<Tooltip class=" w-full">
		<svelte:fragment slot="tooltip">
			<PropertyTooltip {properties} {modifiers} level={1} />
		</svelte:fragment>
		<span class="w-full ">
			{body.DisplayName}
		</span>
	</Tooltip>
</div>

<style lang="postcss">
	.selected {
		background-color: theme(colors.slate.200);
		border-bottom-color: theme(colors.slate.800);
		border-top-color: theme(colors.slate.800);
	}
	@media (prefers-color-scheme: dark) {
		.selected {
			background-color: theme(colors.slate.900);
		}
	}
	.completed {
		border-bottom-color: theme(colors.green.500);
		border-top-color: theme(colors.green.500);
	}
	.completed.selected {
		border-bottom-color: theme(colors.green.800);
		border-top-color: theme(colors.green.800);
	}
</style>
