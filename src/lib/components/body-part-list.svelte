<script lang="ts">
	import type { BodyPart } from '$lib/data/types';
	import {
		actions,
		bodyPartsStore,
		currentSpeciesPartsStore,
		partLabelStore,
		selectedSecretBody,
		selectedStore
	} from '$lib/stores';
	import Error from './base/error.svelte';
	import Panel from './base/panel.svelte';
	import BodyPartItem from './body-part-item.svelte';

	export let onChange: (e: MouseEvent, part: BodyPart) => void = () => undefined;

	let handleClick = (e: MouseEvent, part: BodyPart): void => {
		actions.selectBodyPart(part.Name);
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
	<ul
		class="overflow-scroll overflow-x-hidden max-h-[75vh] divide-y divide-gray-200 rounded-md border-transparent border"
	>
		{#each currentBodyParts as part}
			<BodyPartItem
				selected={!!$selectedStore.bodyPart && part.Name === $selectedStore.bodyPart}
				labelCount={$partLabelStore[part.Name]?.length ?? 0}
				onClick={handleClick}
				{part}
			/>
		{/each}
	</ul>
</Panel>
