<script lang="ts">
	import { bodyPartsStore } from '$lib/data/stores';
	import { mapObjIndexed } from 'ramda';
	import Button from './base/button.svelte';
	import { bodyOptionsStore } from './stores/options-store';
	import type { MinifiedOptions } from './stores/minified-cultivator';
	import { partLabelCountStore } from './stores/part-label-count-store';
	import { selectedStore } from './stores/selected-store';

	const load = (build: MinifiedOptions): void => {
		$selectedStore.secretBody = undefined;
		bodyOptionsStore.set(build.options);
		partLabelCountStore.init($bodyPartsStore.species[build.options.species]);
		partLabelCountStore.merge(
			mapObjIndexed(
				(part) => part.map(([Name, Level]: [string, number]) => ({ Name, Level, MaxLevel: Level })),
				build.labels
			)
		);
	};

	let options: string | undefined = undefined;
	let parsed: MinifiedOptions | undefined;

	$: {
		try {
			parsed = JSON.parse(window.atob(options ?? '')) as MinifiedOptions;
		} catch (error) {
			parsed = undefined;
		}
	}
</script>

<textarea class="w-full" name="cultivator" bind:value={options} rows="25" />
<Button
	on:click={() => {
		if (parsed) {
			load(parsed);
		}
	}}>Load Cultivator</Button
>
