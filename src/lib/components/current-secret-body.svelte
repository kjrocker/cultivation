<script lang="ts">
	import { bodyPartsStore } from '$lib/data/get-body-parts';
	import { labelStore } from '$lib/data/get-labels';
	import { isBodyComplete } from '$lib/util/is-body-complete';
	import CurrentSecretBodyPart from './current-secret-body-part.svelte';
	import { partLabelCountStore } from './stores/part-label-count-store';
	import { partLabelStore } from './stores/part-label-store';

	import { currentSecretBodyStore } from './stores/secret-bodies-store';

	$: allParts = $bodyPartsStore!;

	const completeBody = async () => {
		const labels = $labelStore!;
		secretBodyParts?.forEach(({ Name, Labels }) => {
			const myLabels = Labels.map(({ Name }) => labels.map[Name]);
			partLabelCountStore.append(Name, myLabels);
		});
	};

	$: secretBodyParts = $currentSecretBodyStore?.Parts;
	$: completion = $currentSecretBodyStore
		? isBodyComplete($currentSecretBodyStore, $partLabelStore)
		: {};
</script>

{#if secretBodyParts}
	<ul class="divide-y divide-gray-200 max-h-[50vh] overflow-y-auto overflow-x-hidden">
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
