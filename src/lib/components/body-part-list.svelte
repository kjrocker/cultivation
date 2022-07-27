<script lang="ts">
	import { bodyPartsStore, type BodyPart } from '$lib/data/get-body-parts';
	import type { SpeciesKeys } from '$lib/data/species';
	import BodyPartItem from './body-part-item.svelte';
	import { selectedStore } from './stores/selected-store';
	import { partLabelStore } from './stores/part-label-store';
	import { currentSecretBodyStore } from './stores/secret-bodies-store';
	import Error from './base/error.svelte';
	import { bodyOptionsStore } from './forms/options-store';

	let allParts = $bodyPartsStore!;

	export let onChange: (e: MouseEvent, part: BodyPart) => void = () => undefined;

	let handleClick = (e: MouseEvent, part: BodyPart): void => {
		$selectedStore.bodyPart = part.Name;
		onChange(e, part);
	};

	$: species = $bodyOptionsStore.species.key;
	$: parts = allParts && species ? allParts.species[species].map((name) => allParts.map[name]) : [];
	$: currentBodyNames = $currentSecretBodyStore?.Parts.map((p) => p.Name);
	$: currentBodyParts =
		currentBodyNames === undefined
			? parts
			: parts.filter((part) => currentBodyNames?.includes(part.Name));
	$: missing =
		currentBodyNames === undefined
			? false
			: currentBodyNames?.filter((name) => !parts.map((v) => v.Name).includes(name)).length;
</script>

<div class="my-2">
	{#if missing}
		<Error class="w-full mb-2">
			{!currentBodyParts.length
				? `Every single part is missing! Don't use snakes.`
				: `There are ${missing} body part(s) missing!`}
		</Error>
	{/if}
	<ul class="divide-y divide-gray-200 border rounded-md">
		{#each currentBodyParts as part, i}
			<BodyPartItem
				selected={!!$selectedStore.bodyPart && part.Name === $selectedStore.bodyPart}
				labelCount={$partLabelStore[part.Name]?.length ?? 0}
				onClick={handleClick}
				{part}
			/>
		{/each}
	</ul>
</div>
