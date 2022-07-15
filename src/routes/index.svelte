<script lang="ts">
	import { getBodyParts } from '$lib/data/get-body-parts';

	const parts = getBodyParts('cat');
</script>

{#await parts then value}
	<ul class="list-disc list-inside">
		{#each value as part}
			<li>{part.DisplayName}</li>
		{/each}
	</ul>
{/await}
