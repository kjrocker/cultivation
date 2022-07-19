<script lang="ts">
	import { getBodyLawViews } from '$lib/data/get-body-laws';
	import { SPECIES_CONFIG } from '$lib/data/species';
	import { mapObjIndexed, values } from 'ramda';
	import { speciesLawStore as store, type SpeciesAndLaw } from './species-law-store';

	let species = values(mapObjIndexed((val, key) => ({ key, ...val }), SPECIES_CONFIG));

	const laws = getBodyLawViews();

	export let onSpeciesChange: (val: SpeciesAndLaw) => void = () => undefined;
	export let onLawChange: (val: SpeciesAndLaw) => void = () => undefined;
</script>

<select
	class="w-full"
	bind:value={$store.species}
	on:change={() => {
		onSpeciesChange($store);
	}}
>
	{#each species as spec}
		<option value={spec}>{spec.name}</option>
	{/each}
</select>
{#await laws then { list }}
	<select
		class="w-full"
		bind:value={$store.law}
		on:change={() => {
			onLawChange($store);
		}}
	>
		{#each list as law}
			<option value={law}>{law.DisplayName}</option>
		{/each}
	</select>
{/await}
