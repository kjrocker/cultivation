<script lang="ts">
	import BodyPartList from '$lib/components/body-part-list.svelte';
	import RemoldOptions from '$lib/components/forms/remold-options/remold-options.svelte';
	import SpeciesAndLaw from '$lib/components/forms/species-and-law/species-and-law.svelte';
	import { speciesLawStore } from '$lib/components/forms/species-and-law/species-law-store';
	import PartLabelList from '$lib/components/part-label-list.svelte';
	import { partLabelStore } from '$lib/components/part-label-store';
	import SecretBodies from '$lib/components/secret-bodies.svelte';
	import type { BodyPart } from '$lib/data/get-body-parts';
	import type { LabelView } from '$lib/data/get-labels';
	import { getSecretBodies } from '$lib/data/get-secret-bodies';

	let selectedPart: BodyPart | undefined;

	const onPartChange = (e, part: BodyPart) => {
		if (!$partLabelStore[part.Name]) {
			$partLabelStore[part.Name] = [];
		}
	};
</script>

<div class="flex">
	<RemoldOptions />
	<SpeciesAndLaw
		onSpeciesChange={() => {
			partLabelStore.reset();
		}}
		onLawChange={() => {
			partLabelStore.reset();
		}}
	/>
</div>
<SecretBodies />
<div class="flex">
	<div class="w-1/4">
		<BodyPartList
			species={$speciesLawStore.species.key}
			bind:selected={selectedPart}
			onChange={onPartChange}
		/>
	</div>
	{#if selectedPart && Array.isArray($partLabelStore[selectedPart.Name])}
		<PartLabelList bodyPart={selectedPart} />
	{/if}
</div>
