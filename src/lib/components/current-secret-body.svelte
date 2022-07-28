<script lang="ts">
	import { bodyPartsStore } from '$lib/data/get-body-parts';
	import { labelStore } from '$lib/data/get-labels';
	import { isBodyComplete } from '$lib/util/is-body-complete';
	import { includes } from 'ramda';
	import Button from './base/button.svelte';
	import CurrentSecretBodyPart from './current-secret-body-part.svelte';
	import { currentSpeciesPartsStore } from './stores/current-species-parts-store';
	import { partLabelCountStore } from './stores/part-label-count-store';
	import { partLabelStore } from './stores/part-label-store';

	import { currentSecretBodyStore } from './stores/secret-bodies-store';
	import { selectedStore } from './stores/selected-store';

	$: allParts = $bodyPartsStore!;

	const completeBody = async () => {
		const labels = $labelStore!;
		secretBodyParts?.forEach(({ Name, Labels }) => {
			if ($currentSpeciesPartsStore.includes(Name)) {
				const myLabels = Labels.map(({ Name }) => labels.map[Name]);
				partLabelCountStore.append(Name, myLabels);
			}
		});
	};

	$: secretBodyParts = $currentSecretBodyStore?.Parts;
	$: completion = $currentSecretBodyStore
		? isBodyComplete($currentSecretBodyStore, $partLabelStore)
		: {};
</script>

{#if secretBodyParts}
	<ul class="divide-y divide-gray-200 overflow-x-hidden my-2 border rounded-md">
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
	<Button
		class="w-full"
		on:click={() => {
			completeBody();
		}}>Finish Body</Button
	>
{/if}
