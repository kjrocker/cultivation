<script lang="ts">
	import { getSecretBodyView, type SecretBody } from '$lib/data/get-secret-bodies';
	import type { DataView } from '$lib/util/create-data-table';
	import { onMount } from 'svelte';
	import { speciesLawStore } from './forms/species-and-law/species-law-store';
	import { secretBodyStore } from './secret-bodies-store';

	let bodies: DataView<SecretBody>;

	onMount(async () => {
		bodies = await getSecretBodyView();
	});

	$: bodyNames =
		bodies && bodies.keys.filter((name) => $speciesLawStore.law?.SuperParts.includes(name));
</script>

{#if bodies}-
	<div class="flex flex-row divide-x divide-gray-300">
		{#each bodyNames as name}
			<div
				on:click={() => secretBodyStore.toggle(bodies.map[name])}
				class={`border rounded hover:bg-gray-50 ${
					$secretBodyStore?.Name === name ? 'font-bold' : 'font-medium'
				} `}
			>
				{bodies.map[name].DisplayName}
			</div>
		{/each}
	</div>
{/if}
