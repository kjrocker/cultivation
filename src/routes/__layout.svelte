<script>
	import '../app.css';
	import { secretBodyStore } from '$lib/data/get-secret-bodies';
	import { bodyLawStore, essenceStore, bodyPartsStore } from '$lib/data/stores';
	import { labelStore } from '$lib/data/get-labels';
	import { modifierStore } from '$lib/data/get-modifiers';

	const preloadPromises = [
		bodyPartsStore.init(),
		secretBodyStore.init(),
		bodyLawStore.init(),
		labelStore.init(),
		modifierStore.init(),
		essenceStore.init()
	];

	const preload = Promise.all(preloadPromises);
</script>

{#await preload}
	Loading...
{:then}
	<div class="body mx-8 my-2">
		<slot />
	</div>
{/await}

<style>
	.body {
	}
</style>
