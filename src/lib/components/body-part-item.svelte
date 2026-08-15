<script lang="ts">
	import type { BodyPart } from '$lib/data/types';
	import { validateBodyPart } from '$lib/util/validate-body-part';
	import BodyTypeIcon from './body-parts/body-type-icon.svelte';
	import { getRemoldCount } from '../util/get-remold-count';
	import { bodyOptionsStore, partLabelStore } from '$lib/stores';

	export let selected: boolean;
	export let labelCount: number;
	export let part: BodyPart;
	export let onClick: (e: MouseEvent, p: BodyPart) => void = () => undefined;

	$: remoldCount = getRemoldCount(part.Kind, $bodyOptionsStore);
	$: error = validateBodyPart(part.Name, $partLabelStore, remoldCount);
</script>

<li class:selected>
	<button
		type="button"
		aria-current={selected}
		class="py-2 px-2 flex w-full text-left hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
		on:click={(e) => onClick(e, part)}
	>
		<BodyTypeIcon className="h-8 w-8 dark:invert" type={part.Kind} />
		<div class="ml-3 mr-5 w-full">
			<div class="flex justify-between">
				<span class={`text-sm ${!error ? '' : 'text-red-600 dark:text-red-400'}`}>
					{part.DisplayName}
				</span>
				<span class={`"text-sm ${!error ? '' : 'text-red-600 dark:text-red-400'}`}>
					{labelCount}/{remoldCount}
				</span>
			</div>
			{#if error}
				<p class="text-sm text-red-600 dark:text-red-400">
					{error}
				</p>
			{/if}
		</div>
	</button>
</li>

<style lang="postcss">
	.selected {
		font-weight: 500;
		background-color: theme(colors.slate.200);
	}
	.selected:hover {
		background-color: theme(colors.slate.300);
	}

	@media (prefers-color-scheme: dark) {
		.selected {
			font-weight: 500;
			background-color: theme(colors.slate.800);
		}
		.selected:hover {
			background-color: theme(colors.slate.700);
		}
	}
</style>
