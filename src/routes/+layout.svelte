<script>
	import '../app.css';
	import { loadGameData } from '$lib/stores';

	// Nothing below renders — and so nothing subscribes to a derived store — until
	// every JSON file under static/Data has landed in `gameData`.
	const preload = loadGameData();
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
