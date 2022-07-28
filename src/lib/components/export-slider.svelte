<script lang="ts">
	import { mapObjIndexed, pickBy, pipe } from 'ramda';
	import Button from './base/button.svelte';

	import Slider from './base/slider.svelte';
	import { bodyOptionsStore, type BodyOptions } from './forms/options-store';
	import type { MinifiedOptions } from './stores/minified-cultivator';
	import { partLabelCountStore, type PartLabelCountStore } from './stores/part-label-count-store';

	export let open: boolean;

	const minifyOptions = (options: BodyOptions, labels: PartLabelCountStore): MinifiedOptions => {
		const minifyParts = pipe(pickBy((val) => Array.isArray(val) && val.length > 0));
		return {
			options: options,
			labels: minifyParts(labels)
		};
	};

	$: minified = minifyOptions($bodyOptionsStore, $partLabelCountStore);
	$: options = window.btoa(JSON.stringify(minified));

	$: {
		if (true) {
			console.log(minified);
		}
	}
</script>

<Slider title="Export Cultivator" bind:open>
	<textarea class="w-full" name="cultivator" bind:value={options} rows="25" readonly />
	<Button on:click={() => navigator.clipboard.writeText(options)}>Copy to Clipboard</Button>
</Slider>
