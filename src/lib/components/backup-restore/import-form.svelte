<script lang="ts">
	import { bodyLawStore, bodyPartsStore, labelStore, secretBodyStore } from '$lib/data/stores';
	import { mapObjIndexed } from 'ramda';
	import Button from '../base/button.svelte';
	import { bodyOptionsStore } from '../stores/options-store';
	import type {
		MinifiedOptions,
		MinifiedOptionsV1,
		MinifiedOptionsV2
	} from '../stores/minified-cultivator';
	import { partLabelCountStore } from '../stores/part-label-count-store';
	import { selectedStore } from '../stores/selected-store';
	import { expandEquippedBodies, expandOptions, expandPartLabels } from './util';
	import { equippedSecretBodyStore } from '../stores/equipped-secret-bodies-store';

	const isVersion1 = (build: MinifiedOptions): build is MinifiedOptionsV1 =>
		Object.keys(build).includes('options');

	const isVersion2 = (build: MinifiedOptions): build is MinifiedOptionsV2 =>
		!isVersion1(build) && build.v === 2;

	const loadVersion1 = (build: MinifiedOptionsV1): void => {
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

	const loadVersion2 = (build: MinifiedOptionsV2): void => {
		$selectedStore.secretBody = undefined;
		bodyOptionsStore.set(expandOptions($bodyLawStore, build.o));
		partLabelCountStore.init($bodyPartsStore.species[build.o.sp]);
		partLabelCountStore.merge(expandPartLabels(build.l, $labelStore, $bodyPartsStore));
		equippedSecretBodyStore.set(expandEquippedBodies(build.e, $secretBodyStore));
	};

	const load = (build: MinifiedOptions): void => {
		if (isVersion1(build)) {
			loadVersion1(build);
		} else {
			loadVersion2(build);
		}
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
		console.log({ parsed });
		if (parsed) {
			load(parsed);
		}
	}}>Load Cultivator</Button
>
