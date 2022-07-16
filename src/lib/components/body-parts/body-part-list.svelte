<script lang="ts">
	import type { BodyPart } from '$lib/data/get-body-parts';
	import BodyTypeIcon from './body-type-icon.svelte';

	export let bodyParts: BodyPart[];
	export let onClick: (e: MouseEvent, part: BodyPart) => void;
	export let selected: BodyPart | undefined = undefined;
</script>

<ul class="divide-y divide-gray-200 w-1/4 max-h-[90vh] overflow-y-auto">
	{#each bodyParts as part, i}
		<li class="py-2 flex" on:click={(e) => onClick(e, part)}>
			<BodyTypeIcon className="h-10 w-10" type={part.Kind} />
			<div class="ml-3">
				{#if selected && part.Name === selected.Name}
					<p class="text-sm font-medium text-red-900">{part.DisplayName}</p>
				{:else}
					<p class="text-sm font-medium text-gray-900">{part.DisplayName}</p>
				{/if}
				<p class="text-sm text-gray-500">{part.Kind}</p>
			</div>
		</li>
	{/each}
</ul>
