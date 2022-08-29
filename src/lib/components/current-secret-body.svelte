<script lang="ts">
	import { bodyPartsStore, labelStore } from '$lib/data/stores';
	import { PartToTemperedMap } from '$lib/data/tempering-config';
	import { isBodyComplete } from '$lib/util/is-body-complete';
	import { uniqBy } from 'ramda';
	import Button from './base/button.svelte';
	import Panel from './base/panel.svelte';
	import CurrentSecretBodyPart from './current-secret-body-part.svelte';
	import { currentSpeciesPartsStore } from './stores/current-species-parts-store';
	import { partLabelCountStore } from './stores/part-label-count-store';
	import { partLabelStore } from './stores/part-label-store';
	import { selectedSecretBody, selectedStore } from './stores/selected-store';

	$: allParts = $bodyPartsStore;

	const getTemperedLabelForPart = (name: string) => {
		const { Name, Kind } = $bodyPartsStore.map[name];
		let temperedName;
		if (PartToTemperedMap[Name]) {
			temperedName = PartToTemperedMap[Name];
		} else {
			temperedName = {
				Organ: 'QuenchingLabel_Lv0_Base_Organ',
				Bone: 'QuenchingLabel_Lv0_Base_Bone',
				Flesh: 'QuenchingLabel_Lv0_Base_Flesh'
			}[Kind];
		}
		return $labelStore.map[temperedName];
	};

	const completeBody = async () => {
		const labels = $labelStore!;
		secretBodyParts?.forEach(({ Name, Labels }: any) => {
			if ($currentSpeciesPartsStore.includes(Name)) {
				const myLabels = Labels.map(({ Name }: any) => labels.map[Name]);
				const temperedLabel = getTemperedLabelForPart(Name);
				partLabelCountStore.append(
					Name,
					uniqBy((v) => v.Name, [...myLabels, temperedLabel])
				);
			}
		});
	};

	$: secretBodyParts = $selectedSecretBody?.Parts;
	$: completion = $selectedSecretBody ? isBodyComplete($selectedSecretBody, $partLabelStore) : {};
</script>

{#if secretBodyParts}
	<Panel>
		<ul class="divide-y divide-gray-200 overflow-x-hidden border border-transparent rounded-md">
			{#each secretBodyParts as { Name, Labels }}
				<CurrentSecretBodyPart
					on:click={() => {
						if ($currentSpeciesPartsStore.includes(Name)) {
							$selectedStore.bodyPart = Name;
						}
					}}
					partDisplayName={allParts.map[Name]?.DisplayName}
					disabled={!$currentSpeciesPartsStore.includes(Name)}
					isComplete={completion[Name]}
					secretLabels={Labels}
				/>
			{/each}
		</ul>
	</Panel>
	<Button
		class="w-full"
		on:click={() => {
			completeBody();
		}}>Finish Body</Button
	>
{/if}
