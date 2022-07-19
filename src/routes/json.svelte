<script lang="ts">
	import { getBodyLaws } from '$lib/data/get-body-laws';
	import { getBodyParts } from '$lib/data/get-body-parts';
	import { getLabels } from '$lib/data/get-labels';
	import { getSecretBodies } from '$lib/data/get-secret-bodies';

	import JSONTree from 'svelte-json-tree';

	const promise = getSecretBodies();
</script>

{#await promise then value}
	<JSONTree {value} defaultExpandedLevel={2} />
{/await}
