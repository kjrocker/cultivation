<script lang="ts">
	import { essenceStore } from '$lib/components/stores/essence-names-store';

	import { bodyLawStore } from '$lib/data/get-body-laws';
	import { bodyPartsStore } from '$lib/data/get-body-parts';
	import { labelStore } from '$lib/data/get-labels';
	import { modifierStore } from '$lib/data/get-modifiers';
	import { secretBodyStore } from '$lib/data/get-secret-bodies';

	import JSONTree from 'svelte-json-tree';

	$: value = $essenceStore;
</script>

<JSONTree {value} defaultExpandedLevel={2} />
