<script lang="ts">
	import { getSecretBodies, type SecretBody } from '$lib/data/get-secret-bodies';
	import { onMount } from 'svelte';
	import { speciesLawStore } from './forms/species-and-law/species-law-store';
	import { secretBodyStore } from './secret-bodies-store';

	let bodies: Record<string, SecretBody>;

	onMount(async () => {
		bodies = await getSecretBodies();
	});

	$: bodyNames =
		bodies && Object.keys(bodies).filter((name) => $speciesLawStore.law?.SuperParts.includes(name));
</script>

{#if bodies}-
	<div class="flex flex-row divide-x divide-gray-300">
		{#each bodyNames as name}
			<div
				on:click={() => secretBodyStore.toggle(bodies[name])}
				class={`border rounded hover:bg-gray-50 ${
					$secretBodyStore?.Name === name ? 'font-bold' : 'font-medium'
				} `}
			>
				{bodies[name].DisplayName}
			</div>
		{/each}
	</div>
{/if}
