<script>
	import '../app.css';
	import { bodyPartsStore } from '$lib/data/get-body-parts';
	import { secretBodyStore } from '$lib/data/get-secret-bodies';
	import { bodyLawStore } from '$lib/data/get-body-laws';
	import { labelStore } from '$lib/data/get-labels';

	const preloadPromises = [
		bodyPartsStore.init(),
		secretBodyStore.init(),
		bodyLawStore.init(),
		labelStore.init()
	];

	const preload = Promise.all(preloadPromises);
</script>

{#await preload}
	Loading...
{:then}
	<slot />
{/await}
