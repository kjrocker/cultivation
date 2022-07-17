<script lang="ts">
	import BodyPartList from '$lib/components/body-part-list.svelte';
	import PartLabelList from '$lib/components/part-label-list.svelte';
	import type { BodyPart } from '$lib/data/get-body-parts';
	import type { LabelView } from '$lib/data/get-labels';
	import { SPECIES_CONFIG } from '$lib/data/species';
	import { mapObjIndexed, values } from 'ramda';

	let species = values(mapObjIndexed((val, key) => ({ key, ...val }), SPECIES_CONFIG));
	let selectedSpecies = species[0];
	let selectedPart: BodyPart | undefined;
	let allLabels: Record<string, LabelView[]> = {};

	const setLabels = (selected: LabelView[]) => {
		if (selectedPart) {
			allLabels[selectedPart.Name] = selected;
		}
	};

	const onPartChange = (e, part: BodyPart) => {
		if (!allLabels[part.Name]) {
			allLabels[part.Name] = [];
		}
	};
</script>

<div class="flex">
	<div class="w-1/4">
		<select
			class="w-full"
			bind:value={selectedSpecies}
			on:change={() => {
				allLabels = {};
				selectedPart = undefined;
			}}
		>
			{#each species as spec}
				<option value={spec}>{spec.name}</option>
			{/each}
		</select>
		<BodyPartList
			species={selectedSpecies.key}
			bind:selected={selectedPart}
			onChange={onPartChange}
		/>
	</div>
	{#if selectedPart && Array.isArray(allLabels[selectedPart.Name])}
		<PartLabelList
			bodyPart={selectedPart}
			selected={allLabels[selectedPart.Name]}
			onChange={(e, selected) => setLabels(selected)}
		/>
	{/if}
</div>
