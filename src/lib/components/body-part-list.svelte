<script lang="ts">
	import { bodyPartsStore } from '$lib/data/stores';
	import type { BodyPart } from '$lib/data/types';
	import Error from './base/error.svelte';
	import Panel from './base/panel.svelte';
	import BodyPartItem from './body-part-item.svelte';
	import { currentSpeciesPartsStore } from './stores/current-species-parts-store';
	import { partLabelStore } from './stores/part-label-store';
	import { selectedSecretBody, selectedStore } from './stores/selected-store';

	export let onChange: (e: MouseEvent, part: BodyPart) => void = () => undefined;

	let handleClick = (e: MouseEvent, part: BodyPart): void => {
		$selectedStore.bodyPart = part.Name;
		onChange(e, part);
	};

	$: parts = $currentSpeciesPartsStore.map((name: any) => $bodyPartsStore.map[name]);
	$: currentBodyNames = $selectedSecretBody?.Parts.map((p: any) => p.Name);
	$: currentBodyParts =
		currentBodyNames === undefined
			? parts
			: parts.filter((part: any) => currentBodyNames?.includes(part.Name));
	$: missing =
		currentBodyNames === undefined
			? false
			: currentBodyNames?.filter((name: any) => !parts.map((v: any) => v.Name).includes(name))
					.length;
</script>

<Panel>
	{#if missing}
		<Error class="w-full mb-2">
			{!currentBodyParts.length
				? `Every single part is missing! Don't use snakes.`
				: `There are ${missing} body part(s) missing!`}
		</Error>
	{/if}
	<div
		class="overflow-scroll overflow-x-hidden max-h-[75vh] divide-y divide-gray-200 rounded-md border-transparent border"
	>
		{#each currentBodyParts as part, i}
			<BodyPartItem
				selected={!!$selectedStore.bodyPart && part.Name === $selectedStore.bodyPart}
				labelCount={$partLabelStore[part.Name]?.length ?? 0}
				onClick={handleClick}
				{part}
			/>
		{/each}
	</div>
</Panel>
