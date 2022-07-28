<script lang="ts">
	import Button from '$lib/components/base/button.svelte';
	import BodyPartList from '$lib/components/body-part-list.svelte';
	import CurrentSecretBody from '$lib/components/current-secret-body.svelte';
	import OptionsForm from '$lib/components/forms/options-form.svelte';
	import { bodyOptionsStore } from '$lib/components/forms/options-store';
	import ImportExportSlider from '$lib/components/export-slider.svelte';
	import ModifierBonusList from '$lib/components/modifier-bonus-list.svelte';
	import PartLabelList from '$lib/components/part-label-list.svelte';
	import PropertyBonusList from '$lib/components/property-bonus-list.svelte';
	import SecretBodies from '$lib/components/secret-bodies.svelte';
	import { partLabelCountStore } from '$lib/components/stores/part-label-count-store';
	import { partLabelStore } from '$lib/components/stores/part-label-store';
	import { selectedBodyPart } from '$lib/components/stores/selected-store';
	import { bodyPartsStore } from '$lib/data/get-body-parts';
	import ImportSlider from '$lib/components/import-slider.svelte';
	import ExportSlider from '$lib/components/export-slider.svelte';

	let importSlider = false;
	let exportSlider = false;
</script>

<Button
	on:click={() => {
		importSlider = true;
	}}>Import</Button
>
<Button
	on:click={() => {
		exportSlider = true;
	}}>Export</Button
>
<div class="flex">
	<OptionsForm />
</div>
<SecretBodies />
<div class="flex">
	<div class="w-1/6 min-w-fit mr-1"><CurrentSecretBody /></div>
	<div class="w-1/5 min-w-fit mx-1">
		<BodyPartList />
	</div>
	<div class="w-1/4 min-w-fit mx-1">
		{#if $selectedBodyPart && Array.isArray($partLabelStore[$selectedBodyPart.Name])}
			<PartLabelList bodyPart={$selectedBodyPart} />
		{/if}
	</div>
	<div class="w-1/4 min-w-fit ml-1">
		<PropertyBonusList /><ModifierBonusList />
	</div>
</div>
<ImportSlider bind:open={importSlider} />
<ExportSlider bind:open={exportSlider} />
