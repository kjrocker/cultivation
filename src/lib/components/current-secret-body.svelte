<script lang="ts">
	import { bodyPartsStore } from '$lib/data/get-body-parts';
	import { labelStore } from '$lib/data/get-labels';
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
	$: {
		secretBodyParts?.forEach(({ Name, Labels }) => {
			console.log({ Name, Part: allParts.map[Name] });
		});
	}
</script>

{#if secretBodyParts}
	<ul class="divide-y divide-gray-200 max-h-[90vh] overflow-y-auto overflow-x-hidden">
		{#each secretBodyParts as { Name, Labels }}
			<CurrentSecretBodyPart
				partDisplayName={allParts.map[Name]?.DisplayName}
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
