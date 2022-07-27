<script lang="ts">
	import BodyPartList from '$lib/components/body-part-list.svelte';
	import CurrentSecretBody from '$lib/components/current-secret-body.svelte';
	import RemoldOptions from '$lib/components/forms/remold-options/remold-options.svelte';
	import { selectedBodyPart } from '$lib/components/stores/selected-store';
	import SpeciesAndLaw from '$lib/components/forms/species-and-law/species-and-law.svelte';
	import { speciesLawStore } from '$lib/components/forms/species-and-law/species-law-store';
	import PartLabelList from '$lib/components/part-label-list.svelte';
	import { partLabelStore } from '$lib/components/stores/part-label-store';
	import SecretBodies from '$lib/components/secret-bodies.svelte';
	import { bodyPartsStore } from '$lib/data/get-body-parts';
	import { partLabelCountStore } from '$lib/components/stores/part-label-count-store';
	import PropertyBonusList from '$lib/components/property-bonus-list.svelte';
	import ModifierBonusList from '$lib/components/modifier-bonus-list.svelte';

	$: {
		partLabelCountStore.init($bodyPartsStore.species[$speciesLawStore.species.key]);
	}
</script>

<div class="flex">
	<RemoldOptions />
	<SpeciesAndLaw />
</div>
<SecretBodies />
<div class="flex">
	<div class="w-1/4"><PropertyBonusList /><CurrentSecretBody /></div>
	<div class="w-1/4">
		<BodyPartList species={$speciesLawStore.species.key} />
	</div>
	<div class="w-1/4">
		{#if $selectedBodyPart && Array.isArray($partLabelStore[$selectedBodyPart.Name])}
			<PartLabelList bodyPart={$selectedBodyPart} />
		{/if}
	</div>
	<div class="w-1/4">
		<ModifierBonusList />
	</div>
</div>
