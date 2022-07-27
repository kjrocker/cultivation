<script lang="ts">
	import type { BodyPart } from '$lib/data/get-body-parts';
	import { labelStore, type LabelView } from '$lib/data/get-labels';
	import { filterLabelByPart } from '$lib/util/filter-labels-by-part';
	import { sortBy, uniqBy } from 'ramda';
	import PartLabelItem from './part-label-item.svelte';
	import { partLabelCountStore } from './stores/part-label-count-store';
	import { partLabelStore } from './stores/part-label-store';

	let labels = $labelStore!;

	export let onChange: (e: MouseEvent, label: LabelView[]) => void = () => undefined;
	export let bodyPart: BodyPart;

	const uniqByName = uniqBy<LabelView, string>((v) => v.Name);

	const handleAdd = (e: MouseEvent, label: LabelView) => {
		const newValue = ensureTempered([...selected, label]);
		partLabelCountStore.update(bodyPart.Name, newValue);
		onChange(e, newValue);
	};

	const handleRemove = (e: MouseEvent, label: LabelView) => {
		const newValue = ensureTempered(selected.filter((l) => l.Name !== label.Name));
		partLabelCountStore.update(bodyPart.Name, newValue);
		onChange(e, newValue);
	};

	const ensureTempered = (newSelected: LabelView[]): LabelView[] => {
		if (newSelected.length === 0) return newSelected;
		if (newSelected[0].Name !== temperedLabel?.Name) {
			return uniqByName([temperedLabel as LabelView, ...newSelected]);
		} else {
			return uniqByName(newSelected);
		}
	};

	$: selected = $partLabelStore[bodyPart.Name];
	$: temperedLabel = filteredLabels?.find((label) => label.MaxLevel >= 100);
	$: filteredLabels = sortBy(
		(view) =>
			selected.find((l) => l.Name === view.Name) ? view.MaxLevel * -1000 : view.MaxLevel * -1,
		labels?.list?.filter((label) => filterLabelByPart(bodyPart, label)) ?? []
	);
</script>

<div class="my-2">
	<ul class="divide-y divide-gray-200 overflow-x-hidden border rounded-md">
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
</div>
