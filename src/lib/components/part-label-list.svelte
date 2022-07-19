<script lang="ts">
	import { filterLabelByPart } from '$lib/data/filter-labels-by-part';
	import type { BodyPart } from '$lib/data/get-body-parts';
	import { getLabels, type LabelView } from '$lib/data/get-labels';
	import { sortBy } from 'ramda';
	import { onMount } from 'svelte';
	import { SvelteComponentDev } from 'svelte/internal';
	import BodyTypeIcon from './body-parts/body-type-icon.svelte';
	import PartLabelItem from './part-label-item.svelte';
	import { partLabelStore } from './part-label-store';

	let labels: LabelView[] = [];

	export let onChange: (e: MouseEvent, label: LabelView[]) => void = () => undefined;
	export let bodyPart: BodyPart;

	onMount(async () => {
		labels = await getLabels();
	});

	const handleAdd = (e: MouseEvent, label: LabelView) => {
		const newValue = ensureTempered([...selected, label]);
		partLabelStore.update(bodyPart.Name, newValue);
		onChange(e, newValue);
	};

	const handleRemove = (e: MouseEvent, label: LabelView) => {
		const newValue = ensureTempered(selected.filter((l) => l.Name !== label.Name));
		partLabelStore.update(bodyPart.Name, newValue);
		onChange(e, newValue);
	};

	const ensureTempered = (newSelected: LabelView[]): LabelView[] => {
		if (newSelected.length === 0) return newSelected;
		if (newSelected[0].Name !== filteredLabels[0].Name) {
			return [filteredLabels[0], ...newSelected];
		} else {
			return newSelected;
		}
	};

	$: selected = $partLabelStore[bodyPart.Name];

	$: filteredLabels = sortBy(
		(view) =>
			selected.find((l) => l.Name === view.Name) ? view.MaxLevel * -1000 : view.MaxLevel * -1,
		labels.filter((label) => filterLabelByPart(bodyPart, label))
	);
</script>

<ul class="divide-y divide-gray-200 w-1/4 max-h-[90vh] overflow-y-auto overflow-x-hidden">
	Current: {bodyPart.DisplayName}
	{#each filteredLabels as label, i}
		<PartLabelItem
			selected={!!selected.find((l) => l.Name === label.Name)}
			{label}
			onClick={(e, label) => {
				return !!selected.find((l) => l.Name === label.Name)
					? handleRemove(e, label)
					: handleAdd(e, label);
			}}
		/>
	{/each}
</ul>
