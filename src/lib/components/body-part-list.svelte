<script lang="ts">
	import { getBodyParts, type BodyPart } from '$lib/data/get-body-parts';
	import type { SpeciesKeys } from '$lib/data/species';
	import BodyTypeIcon from './body-parts/body-type-icon.svelte';

	export let species: SpeciesKeys;
	export let onChange: (e: MouseEvent, part: BodyPart) => void = () => undefined;
	export let selected: BodyPart | undefined = undefined;

	let handleClick = (e: MouseEvent, part: BodyPart): void => {
		selected = part;
		onChange(e, part);
	};

	$: parts = getBodyParts(species);
</script>

{#await parts then bodyParts}
	<ul class="divide-y divide-gray-200 max-h-[90vh] overflow-y-auto">
		{#each bodyParts as part, i}
			{#if selected && part.Name === selected.Name}
				<li class="py-2 flex bg-gray-50" on:click={(e) => handleClick(e, part)}>
					<BodyTypeIcon className="h-10 w-10" type={part.Kind} />
					<div class="ml-3">
						<p class="text-sm font-bold text-gray-900">{part.DisplayName}</p>
						<p class="text-sm text-gray-500">{part.Kind}</p>
					</div>
				</li>
			{:else}
				<li class="py-2 flex" on:click={(e) => handleClick(e, part)}>
					<BodyTypeIcon className="h-10 w-10" type={part.Kind} />
					<div class="ml-3">
						<p class="text-sm font-medium text-gray-900">{part.DisplayName}</p>
						<p class="text-sm text-gray-500">{part.Kind}</p>
					</div>
				</li>
			{/if}
		{/each}
	</ul>
{/await}
