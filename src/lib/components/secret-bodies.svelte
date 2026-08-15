<script lang="ts">
	import { secretBodyStore, selectedLawStore } from '$lib/stores';
	import SecretBodyItem from './secret-body-item.svelte';

	$: bodyNames =
		$secretBodyStore &&
		$secretBodyStore.keys.filter((name) => $selectedLawStore.SuperParts.includes(name));
</script>

<div class="overflow-x-scroll">
	<div class="block">
		<nav class="flex divide-x" aria-label="Tabs">
			{#each bodyNames as name}
				<SecretBodyItem {name} />
			{/each}
		</nav>
	</div>
</div>
