<script lang="ts">
	import { secretBodyStore } from '$lib/data/stores';
	import SecretBodyItem from './secret-body-item.svelte';
	import { selectedLawStore } from './stores/selected-store';

	$: bodyNames =
		$secretBodyStore &&
		$secretBodyStore.keys.filter((name) => $selectedLawStore.SuperParts.includes(name));
</script>

<div>
	<div class="block">
		<div class="border-b border-gray-200">
			<nav class="-mb-px flex" aria-label="Tabs">
				<!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
				{#each bodyNames as name}
					<SecretBodyItem {name} />
				{/each}
			</nav>
		</div>
	</div>
</div>
