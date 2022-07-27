<script lang="ts">
	import { secretBodyStore, type SecretBody } from '$lib/data/get-secret-bodies';
	import type { DataView } from '$lib/util/create-data-table';
	import { selectedStore } from './stores/selected-store';
	import { speciesLawStore } from './forms/species-and-law/species-law-store';
	import { currentSecretBodyStore } from './stores/secret-bodies-store';
	import { completeSecretBodiesStore } from './stores/complete-secret-bodies-store';

	$: bodies = $secretBodyStore as DataView<SecretBody>;
	$: bodyNames =
		bodies && bodies.keys.filter((name) => $speciesLawStore.law?.SuperParts.includes(name));
</script>

{#if bodies}
	<div class="flex flex-row divide-x divide-gray-300">
		{#each bodyNames as name}
			<div
				on:click={() => {
					currentSecretBodyStore.toggle(bodies?.map[name]);
					selectedStore.update((v) => ({ ...v, bodyPart: bodies?.map[name].Parts[0].Name }));
				}}
				class={`border rounded hover:bg-gray-50 ${
					$currentSecretBodyStore?.Name === name ? 'font-bold' : 'font-medium'
				} ${$completeSecretBodiesStore[name] ? 'bg-green-200' : ''}`}
			>
				{bodies.map[name].DisplayName}
			</div>
		{/each}
	</div>
{/if}
