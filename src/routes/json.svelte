<script lang="ts">
	import {
		bodyLawStore,
		essenceStore,
		bodyPartsStore,
		labelStore,
		secretBodyStore,
		modifierStore
	} from '$lib/data/stores';

	import JSONTree from 'svelte-json-tree';

	$: value = $essenceStore;
</script>

<JSONTree {value} defaultExpandedLevel={2} />
