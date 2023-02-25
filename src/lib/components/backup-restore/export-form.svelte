<script lang="ts">
	import { bodyLawStore, bodyPartsStore, labelStore, secretBodyStore } from '$lib/data/stores';
	import type { BodyLaw, LabelView, SecretBody } from '$lib/data/types';
	import type { DataView } from '$lib/data/util/create-data-table';
	import Button from '../base/button.svelte';
	import {
		equippedSecretBodyStore,
		type EquippedSecretBodyStore
	} from '../stores/equipped-secret-bodies-store';
	import type { MinifiedOptionsV2 } from '../stores/minified-cultivator';
	import { bodyOptionsStore, type BodyOptions } from '../stores/options-store';
	import { partLabelCountStore, type PartLabelCountStore } from '../stores/part-label-count-store';
	import { shrinkEquippedBodies, shrinkOptions, shrinkPartLabels } from './util';

	type MinifyStores = {
		options: BodyOptions;
		partLabels: PartLabelCountStore;
		equipped: EquippedSecretBodyStore;
		laws: DataView<BodyLaw>;
		secretBodies: DataView<SecretBody>;
		labels: DataView<LabelView>;
		bodyParts: typeof $bodyPartsStore;
	};

	const minifyOptionsV2 = ({
		options,
		partLabels,
		equipped,
		laws,
		secretBodies,
		labels,
		bodyParts
	}: MinifyStores): MinifiedOptionsV2 => {
		return {
			v: 2,
			o: shrinkOptions(laws, options),
			l: shrinkPartLabels(partLabels, labels, bodyParts),
			e: shrinkEquippedBodies(equipped, secretBodies)
		};
	};

	$: minified = minifyOptionsV2({
		options: $bodyOptionsStore,
		partLabels: $partLabelCountStore,
		labels: $labelStore,
		equipped: $equippedSecretBodyStore,
		laws: $bodyLawStore,
		secretBodies: $secretBodyStore,
		bodyParts: $bodyPartsStore
	});
	$: options = window.btoa(JSON.stringify(minified));
</script>

<textarea
	class="w-full bg-slate-100 dark:bg-slate-700"
	name="cultivator"
	bind:value={options}
	rows="25"
	readonly
/>
<Button on:click={() => navigator.clipboard.writeText(options)}>Copy to Clipboard</Button>
