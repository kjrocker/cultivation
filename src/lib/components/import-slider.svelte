<script lang="ts">
	import { bodyPartsStore } from '$lib/data/get-body-parts';

	import Button from './base/button.svelte';

	import Slider from './base/slider.svelte';
	import { bodyOptionsStore } from './forms/options-store';
	import type { MinifiedOptions } from './stores/minified-cultivator';
	import { partLabelCountStore } from './stores/part-label-count-store';

	export let open: boolean;

	const load = (build: MinifiedOptions): void => {
		bodyOptionsStore.set(build.options);
		partLabelCountStore.init($bodyPartsStore.species[build.options.species.key]);
		partLabelCountStore.merge(build.labels);
	};

	let options: string | undefined = undefined;

	$: parsed = options ? JSON.parse(window.atob(options)) : '';

	$: {
		if (true) {
			console.log(parsed);
		}
	}
</script>

<Slider title="Import Cultivator" bind:open>
	<textarea class="w-full" name="cultivator" bind:value={options} rows="25" />
	<Button
		on:click={() => {
			load(parsed);
		}}>Load Cultivator</Button
	>
</Slider>
