<script lang="ts">
	import { getAllBodyParts } from '$lib/data/get-body-parts';

	import { getLabelsView } from '$lib/data/get-labels';
	import { CheckCircle, MinusCircle } from '@steeze-ui/iconic-free';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { difference, indexBy } from 'ramda';
	import CurrentSecretBodyPart from './current-secret-body-part.svelte';
	import { speciesLawStore } from './forms/species-and-law/species-law-store';
	import { partLabelStore } from './part-label-store';

	import { secretBodyStore } from './secret-bodies-store';

	const values = getAllBodyParts();

	const completeBody = async () => {
		const labels = await getLabelsView();
		secretBodyParts?.forEach(({ Name, Labels }) => {
			const myLabels = Labels.map(({ Name }) => labels.map[Name]);
			partLabelStore.append(Name, myLabels);
		});
	};

	$: secretBodyParts = $secretBodyStore?.Parts;
	$: myLabels = indexBy(
		(p) => p.Name,
		secretBodyParts?.map((part) => {
			const needed = part.Labels.map((l) => l.Name);
			const current = $partLabelStore[part.Name]?.map((l) => l.Name) ?? [];
			return {
				Name: part.Name,
				Complete: difference(needed, current).length === 0
			};
		}) ?? []
	);
</script>

{#await values then allParts}
	{#if secretBodyParts}
		<ul class="divide-y divide-gray-200 max-h-[90vh] overflow-y-auto overflow-x-hidden">
			{#each secretBodyParts as { Name, Labels }}
				<CurrentSecretBodyPart
					partDisplayName={allParts[$speciesLawStore.species.key].map[Name].DisplayName}
					isComplete={myLabels[Name]?.Complete}
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
{/await}
