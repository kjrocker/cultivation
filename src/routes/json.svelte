<script lang="ts">
	import { bodyLawStore, essenceStore, bodyPartsStore } from '$lib/data/stores';
	import { labelStore } from '$lib/data/get-labels';
	import { modifierStore } from '$lib/data/get-modifiers';
	import { secretBodyStore } from '$lib/data/get-secret-bodies';

	import JSONTree from 'svelte-json-tree';

	$: value = $essenceStore;
</script>

<JSONTree {value} defaultExpandedLevel={2} />
