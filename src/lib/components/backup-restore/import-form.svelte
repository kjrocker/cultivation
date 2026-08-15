<script lang="ts">
	import type { MinifiedOptions } from '$lib/core/backup';
	import { actions, gameData } from '$lib/stores';
	import Button from '../base/button.svelte';

	let options: string | undefined = undefined;
	let parsed: MinifiedOptions | undefined;
	let error: string | undefined;

	const load = (build: MinifiedOptions) => {
		try {
			actions.restore($gameData, build);
			error = undefined;
		} catch (e) {
			error = (e as Error).message;
		}
	};

	$: {
		try {
			parsed = JSON.parse(window.atob(options ?? '')) as MinifiedOptions;
		} catch (err) {
			parsed = undefined;
		}
	}
</script>

<textarea
	class="w-full bg-slate-100 dark:bg-slate-700"
	name="cultivator"
	bind:value={options}
	rows="25"
/>
<Button
	on:click={() => {
		if (parsed) {
			load(parsed);
		}
	}}>Load Cultivator</Button
>
{#if error}
	<p class="text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>
{/if}
