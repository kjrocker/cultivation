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
	<div class="body px-4 py-2">
		<slot />
	</div>
{/await}

<style>
	.body {
		background-color: #f2f2f2;
	}
	@media (prefers-color-scheme: dark) {
		.body {
			color: #c9d1d9;
			background: #0d1117;
		}
	}
</style>
