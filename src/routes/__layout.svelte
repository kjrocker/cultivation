<script>
	import '../app.css';
	import {
		bodyLawStore,
		essenceStore,
		bodyPartsStore,
		secretBodyStore,
		labelStore,
		modifierStore
	} from '$lib/data/stores';

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
