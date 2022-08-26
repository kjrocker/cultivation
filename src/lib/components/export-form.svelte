<script lang="ts">
	import { mapObjIndexed, pickBy } from 'ramda';
	import Button from './base/button.svelte';
	import { bodyOptionsStore, type BodyOptions } from './forms/options-store';
	import type { MinifiedOptions } from './stores/minified-cultivator';
	import { partLabelCountStore, type PartLabelCountStore } from './stores/part-label-count-store';

	const minifyOptions = (options: BodyOptions, labels: PartLabelCountStore): MinifiedOptions => {
		const trimmedParts: PartLabelCountStore = pickBy(
			(val) => Array.isArray(val) && val.length > 0,
			labels
		);
		const shrinkParts: Record<string, [string, number][]> = mapObjIndexed(
			(val) => val.map((p) => [p.Name, p.Level]),
			trimmedParts
		);
		return {
			options: options,
			labels: shrinkParts
		};
	};

	$: minified = minifyOptions($bodyOptionsStore, $partLabelCountStore);
	$: options = window.btoa(JSON.stringify(minified));
</script>

<textarea class="w-full" name="cultivator" bind:value={options} rows="25" readonly />
<Button on:click={() => navigator.clipboard.writeText(options)}>Copy to Clipboard</Button>
