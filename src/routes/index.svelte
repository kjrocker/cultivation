<script lang="ts">
	import BodyPartList from '$lib/components/body-part-list.svelte';
	import PartLabelList from '$lib/components/part-label-list.svelte';
	import { getBodyLaws } from '$lib/data/get-body-laws';
	import type { BodyPart } from '$lib/data/get-body-parts';
	import type { LabelView } from '$lib/data/get-labels';
	import { SPECIES_CONFIG } from '$lib/data/species';
	import { mapObjIndexed, values } from 'ramda';
	import JSONTree from 'svelte-json-tree';

	let species = values(mapObjIndexed((val, key) => ({ key, ...val }), SPECIES_CONFIG));
	let selectedSpecies = species[0];
	let selectedPart: BodyPart | undefined;
	let selectedLaw: BodyLaw | undefined;
	let options = {
		temperedSpine: true,
		temperedBrain: true,
		temperedHeart: true,
		illusionBrain: false,
		fireSpine: false,
		transcendantHeart: false
	};
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

	const laws = getBodyLaws();
</script>

<!-- {#await laws then value}
	<JSONTree {value} defaultExpandedLevel={2} />
{/await} -->

<div class="flex">
	<label htmlfor="temperedHeart">
		<input name="temperedHeart" bind:checked={options.temperedHeart} type="checkbox" />
		Tempered Heart
	</label>
	<label htmlfor="temperedBrain">
		<input name="temperedBrain" bind:checked={options.temperedBrain} type="checkbox" />
		Tempered Brain
	</label>
	<label htmlfor="temperedSpine">
		<input name="temperedSpine" bind:checked={options.temperedSpine} type="checkbox" />
		Tempered Spine
	</label>
	<label htmlfor="fireSpine">
		<input name="fireSpine" bind:checked={options.fireSpine} type="checkbox" />
		Firestruck Spine
	</label>
	<label htmlfor="illusionBrain">
		<input name="illusionBrain" bind:checked={options.illusionBrain} type="checkbox" />
		Illusionary Brain
	</label>
	<label htmlfor="transcendantHeart">
		<input name="transcendantHeart" bind:checked={options.transcendantHeart} type="checkbox" />
		Transcendant Heart
	</label>
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
	{#await laws then lawValues}
		<select
			class="w-full"
			bind:value={selectedLaw}
			on:change={() => {
				allLabels = {};
				selectedPart = undefined;
			}}
		>
			{#each lawValues as law}
				<option value={law}>{law.DisplayName}</option>
			{/each}
		</select>
	{/await}
</div>
<div class="flex">
	<div class="w-1/4">
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
