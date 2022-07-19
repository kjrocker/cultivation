<script lang="ts">
	import { getBodyParts, type BodyPart } from '$lib/data/get-body-parts';
	import type { SpeciesKeys } from '$lib/data/species';
	import BodyPartItem from './body-part-item.svelte';
	import { partLabelStore } from './part-label-store';
	import { secretBodyStore } from './secret-bodies-store';

	export let species: SpeciesKeys;
	export let onChange: (e: MouseEvent, part: BodyPart) => void = () => undefined;
	export let selected: BodyPart | undefined = undefined;

	let handleClick = (e: MouseEvent, part: BodyPart): void => {
		selected = part;
		onChange(e, part);
	};

	$: parts = getBodyParts(species);
	$: currentBodyNames = $secretBodyStore?.Parts.map((p) => p.Name);
	$: currentBodyParts =
		currentBodyNames === undefined
			? parts
			: parts.then((partList) => partList.filter((part) => currentBodyNames?.includes(part.Name)));
	$: isMissingParts =
		currentBodyNames === undefined
			? Promise.resolve(false)
			: parts.then(
					(partList) =>
						currentBodyNames?.filter((name) => !partList.map((v) => v.Name).includes(name)).length
			  );
</script>

{#await currentBodyParts then bodyParts}
	<ul class="divide-y divide-gray-200 max-h-[90vh] overflow-y-auto">
		{#await isMissingParts then missing}
			{#if missing && bodyParts.length}
				<li>There are {missing} body part(s) missing!</li>
			{:else if missing}
				<li>Every single part is missing! Don't use snakes.</li>
			{/if}
			{#each bodyParts as part, i}
				<BodyPartItem
					selected={!!selected && part.Name === selected.Name}
					labelCount={$partLabelStore[part.Name]?.length ?? 0}
					onClick={handleClick}
					{part}
				/>
			{/each}
		{/await}
	</ul>
{/await}
