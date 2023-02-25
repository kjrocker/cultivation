<script lang="ts">
	import { labelStore } from '$lib/data/stores';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { CheckCircle, MinusCircle } from '@steeze-ui/iconic-free';
	import type { SecretBody } from '$lib/data/types';

	export let isComplete: boolean;
	export let partDisplayName: string;
	export let disabled = false;
	export let selected = false;
	export let secretLabels: SecretBody['Parts'][number]['Labels'];

	const allLabels = $labelStore;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<li
	class="py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-sm"
	class:selected
	on:click
>
	<div class={`flex justify-between ${disabled ? 'line-through' : ''}`}>
		<span>{partDisplayName}</span>
		<span class="mr-2">
			{#if isComplete}
				<Icon class="h-5 w-5 text-green-400" src={CheckCircle} />
			{:else}
				<Icon class="h-5 w-5 text-red-400" src={MinusCircle} />
			{/if}
		</span>
	</div>
	{#each secretLabels as label}
		<p class="text-sm text-gray-700 dark:text-gray-400">{allLabels.map[label.Name].DisplayName}</p>
	{/each}
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
