<script lang="ts">
	import { essenceStore } from '$lib/data/stores';

	import JSONTree from 'svelte-json-tree';

	$: value = $essenceStore;
</script>

<JSONTree {value} defaultExpandedLevel={2} />
