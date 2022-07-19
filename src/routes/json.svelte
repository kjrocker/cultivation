<script lang="ts">
	import { getBodyLawViews } from '$lib/data/get-body-laws';
	import { getBodyParts } from '$lib/data/get-body-parts';
	import { getLabelsView } from '$lib/data/get-labels';
	import { getSecretBodyView } from '$lib/data/get-secret-bodies';

	import JSONTree from 'svelte-json-tree';

	const promise = getSecretBodyView();
</script>

{#await promise then value}
	<JSONTree {value} defaultExpandedLevel={2} />
{/await}
