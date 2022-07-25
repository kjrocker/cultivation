<script lang="ts">
	import { bodyLawStore } from '$lib/data/get-body-laws';
	import { bodyPartsStore } from '$lib/data/get-body-parts';
	import { labelStore } from '$lib/data/get-labels';
	import { secretBodyStore } from '$lib/data/get-secret-bodies';

	import JSONTree from 'svelte-json-tree';

	$: value = labelStore;
</script>

<JSONTree {value} defaultExpandedLevel={2} />
