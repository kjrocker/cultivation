<script lang="ts">
	import {
		actions,
		completeSecretBodiesStore,
		currentSpeciesPartsStore,
		secretBodyStore,
		selectedStore
	} from '$lib/stores';
	import { CheckCircle } from '@steeze-ui/iconic-free';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { intersection } from 'ramda';
	import Tooltip from './base/tooltip.svelte';
	import PropertyTooltip from './property-tooltip.svelte';

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

<div class="border-y-8" class:selected class:completed>
	<Tooltip class="w-full h-full" let:describedBy>
		<svelte:fragment slot="tooltip">
			<PropertyTooltip {properties} {modifiers} level={1} />
		</svelte:fragment>
		<button
			type="button"
			aria-current={selected}
			aria-describedby={describedBy}
			class="py-2 px-1 w-full h-full text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
			on:click={() => {
				actions.toggleSecretBody(body.Name);
				actions.selectBodyPart(overlappingNames[0] ?? undefined);
			}}
		>
			{body.DisplayName}
		</button>
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
