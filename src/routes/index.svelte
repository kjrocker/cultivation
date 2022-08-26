<script lang="ts">
	import Button from '$lib/components/base/button.svelte';
	import Slider from '$lib/components/base/slider.svelte';
	import BodyPartList from '$lib/components/body-part-list.svelte';
	import CurrentSecretBody from '$lib/components/current-secret-body.svelte';
	import EquipSecretBodiesForm from '$lib/components/equip-secret-bodies-form.svelte';
	import ExportForm from '$lib/components/export-form.svelte';
	import OptionsForm from '$lib/components/forms/options-form.svelte';
	import { bodyOptionsStore } from '$lib/components/stores/options-store';
	import ImportForm from '$lib/components/import-form.svelte';
	import ModifierBonusList from '$lib/components/modifier-bonus-list.svelte';
	import PartLabelList from '$lib/components/part-label-list.svelte';
	import PropertyBonusList from '$lib/components/property-bonus-list.svelte';
	import SecretBodies from '$lib/components/secret-bodies.svelte';
	import { partLabelCountStore } from '$lib/components/stores/part-label-count-store';
	import { partLabelStore } from '$lib/components/stores/part-label-store';
	import { selectedBodyPart } from '$lib/components/stores/selected-store';
	import { bodyPartsStore } from '$lib/data/get-body-parts';
	import { onMount } from 'svelte';
	import QiRecovery from '$lib/components/qi-recovery.svelte';

	let importSlider = false;
	let exportSlider = false;
	let equipSlider = false;

	onMount(() => {
		partLabelCountStore.init($bodyPartsStore.species[$bodyOptionsStore.species]);
	});
</script>

<div class="flex">
	<div class="flex w-full justify-center mb-4 mt-2">
		<OptionsForm />
		<Button
			class="h-12 ml-4 mr-2 mt-4"
			on:click={() => {
				equipSlider = true;
			}}>Equip</Button
		>
		<Button
			class="h-12 ml-2 mt-4"
			on:click={() => {
				exportSlider = true;
			}}>Backup</Button
		>
		<Button
			class="h-12 ml-4 mr-2 mt-4"
			on:click={() => {
				importSlider = true;
			}}>Restore</Button
		>
		<Slider title="Equip Secret Bodies" bind:open={equipSlider}><EquipSecretBodiesForm /></Slider>
		<Slider title="Restore Cultivator" bind:open={importSlider}><ImportForm /></Slider>
		<Slider title="Backup Cultivator" bind:open={exportSlider}><ExportForm /></Slider>
	</div>
</div>
<SecretBodies />
<div class="flex">
	<div class="w-1/6 min-w-[10rem] mr-1"><CurrentSecretBody /></div>
	<div class="w-1/5 min-w-[12rem] mx-1 max-h-[75vh] overflow-y-scroll">
		<BodyPartList />
	</div>
	<div class="w-1/4 min-w-[14rem] mx-1 max-h-[75vh] overflow-y-scroll">
		{#if $selectedBodyPart && Array.isArray($partLabelStore[$selectedBodyPart.Name])}
			<PartLabelList bodyPart={$selectedBodyPart} />
		{/if}
	</div>
	<div class="w-1/4 min-w-fit ml-1">
		<PropertyBonusList /><ModifierBonusList /><QiRecovery />
	</div>
</div>
