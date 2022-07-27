<script lang="ts">
	import { secretBodyStore, type SecretBody } from '$lib/data/get-secret-bodies';
	import type { DataView } from '$lib/util/create-data-table';
	import { selectedStore } from './stores/selected-store';
	import { currentSecretBodyStore } from './stores/secret-bodies-store';
	import { bodyOptionsStore } from './forms/options-store';

	$: bodies = $secretBodyStore as DataView<SecretBody>;
	$: bodyNames =
		bodies && bodies.keys.filter((name) => $bodyOptionsStore.law?.SuperParts.includes(name));
</script>

<div>
	<div class="block">
		<div class="border-b border-gray-200">
			<nav class="-mb-px flex" aria-label="Tabs">
				<!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
				{#each bodyNames as name}
					<span
						on:click={() => {
							currentSecretBodyStore.toggle(bodies?.map[name]);
							selectedStore.update((v) => ({ ...v, bodyPart: bodies?.map[name].Parts[0].Name }));
						}}
						class={`w-1/4 py-4 px-1 text-center border-2 font-medium text-md cursor-pointer ${
							$currentSecretBodyStore?.Name === name
								? 'border-indigo-500 text-indigo-600'
								: 'border-transparent text-gray-900 hover:bg-gray-50 hover:border-gray-300'
						}`}
					>
						{bodies.map[name].DisplayName}
					</span>
				{/each}
			</nav>
		</div>
	</div>
</div>
