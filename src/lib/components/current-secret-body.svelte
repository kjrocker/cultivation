<script lang="ts">
	import { bodyPartsStore } from '$lib/data/get-body-parts';
	import { labelStore } from '$lib/data/get-labels';
	import { isBodyComplete } from '$lib/util/is-body-complete';
	import { difference, indexBy } from 'ramda';
	import CurrentSecretBodyPart from './current-secret-body-part.svelte';
	import { partLabelStore } from './part-label-store';

	import { currentSecretBodyStore } from './secret-bodies-store';

	$: allParts = $bodyPartsStore!;

	const completeBody = async () => {
		const labels = $labelStore!;
		secretBodyParts?.forEach(({ Name, Labels }) => {
			const myLabels = Labels.map(({ Name }) => labels.map[Name]);
			partLabelStore.append(Name, myLabels);
		});
	};

	$: secretBodyParts = $currentSecretBodyStore?.Parts;
	$: completion = $currentSecretBodyStore
		? isBodyComplete($currentSecretBodyStore, $partLabelStore)
		: {};
</script>

{#if secretBodyParts}
	<ul class="divide-y divide-gray-200 max-h-[90vh] overflow-y-auto overflow-x-hidden">
		{#each secretBodyParts as { Name, Labels }}
			<CurrentSecretBodyPart
				partDisplayName={allParts.map[Name]?.DisplayName}
				isComplete={completion[Name]}
				secretLabels={Labels}
			/>
		{/each}
	</ul>
	<button
		on:click={() => {
			completeBody();
		}}>Finish Body</button
	>
{/if}
