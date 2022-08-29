<script lang="ts">
	import { labelStore } from '$lib/data/stores';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { CheckCircle, MinusCircle } from '@steeze-ui/iconic-free';
	import type { SecretBody } from '$lib/data/types';

	export let isComplete: boolean;
	export let partDisplayName: string;
	export let disabled = false;
	export let secretLabels: SecretBody['Parts'][number]['Labels'];

	const allLabels = $labelStore;
</script>

<li class="py-2 px-2 hover:bg-gray-100 cursor-pointer" on:click>
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
		<p class="text-sm text-gray-500">{allLabels.map[label.Name].DisplayName}</p>
	{/each}
</li>
