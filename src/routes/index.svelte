<script lang="ts">
	import BodyPartList from '$lib/components/body-parts/body-part-list.svelte';
	import LabelList from '$lib/components/body-parts/label-list.svelte';
	import { getBodyParts, type BodyPart } from '$lib/data/get-body-parts';
	import { getLabels, type LabelView } from '$lib/data/get-labels';

	const parts = getBodyParts('human');
	const labels = getLabels();

	let selectedPart: BodyPart;
	const setPart = (_e, value: BodyPart) => {
		selectedPart = value;
	};

	let selectedLabel: LabelView;
	const setLabel = (_e, value: LabelView) => {
		selectedLabel = value;
	};
</script>

<div class="flex">
	{#await parts then value}
		<BodyPartList bodyParts={value} selected={selectedPart} onClick={setPart} />
	{/await}

	{#await labels then value}
		<LabelList labels={value} bodyPart={selectedPart} selected={selectedLabel} onClick={setLabel} />
	{/await}
</div>
