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
	$: currentBodyParts =
		$secretBodyStore === undefined
			? parts
			: parts.then((partList) =>
					partList.filter((part) => $secretBodyStore?.Parts.map((p) => p.Name).includes(part.Name))
			  );
</script>

{#await currentBodyParts then bodyParts}
	<ul class="divide-y divide-gray-200 max-h-[90vh] overflow-y-auto">
		{#each bodyParts as part, i}
			<BodyPartItem
				selected={!!selected && part.Name === selected.Name}
				labelCount={$partLabelStore[part.Name]?.length ?? 0}
				onClick={handleClick}
				{part}
			/>
		{/each}
	</ul>
{/await}
