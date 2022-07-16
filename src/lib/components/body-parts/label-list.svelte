<script lang="ts">
	import type { BodyPart } from '$lib/data/get-body-parts';

	import type { LabelView } from '$lib/data/get-labels';
	import { props, sortBy } from 'ramda';
	import BodyTypeIcon from './body-type-icon.svelte';

	export let labels: LabelView[];
	export let onClick: (e: MouseEvent, label: LabelView) => void;
	export let selected: LabelView | undefined = undefined;
	export let bodyPart: BodyPart;

	const labelBlacklist = ['QuenchingLabel_Lv0_Base'];

	const filterLabelByPart = (part: BodyPart, label: LabelView): boolean => {
		if (!part) {
			return false;
		}
		if (labelBlacklist.includes(label.Name)) {
			return false;
		}
		if (label.BodyPart === 'Any' && !label.DisplayName.includes('Tempered')) {
			return true;
		}
		return label.BodyPart === part.Kind;
	};

	$: filteredLabels = sortBy(
		(view) => view.MaxLevel * -1,
		labels.filter((label) => filterLabelByPart(bodyPart, label))
	);
</script>

<ul class="divide-y divide-gray-200 w-1/4 max-h-[90vh] overflow-y-auto">
	{#each filteredLabels as part, i}
		<li class="py-2 flex" on:click={(e) => onClick(e, part)}>
			<BodyTypeIcon className="h-10 w-10" type={part.BodyPart} />
			<div class="ml-3">
				{#if selected && part.Name === selected.Name}
					<p class="text-sm font-medium text-red-900">{part.DisplayName}</p>
				{:else}
					<p class="text-sm font-medium text-gray-900">{part.DisplayName}</p>
				{/if}
				<p class="text-sm text-gray-500">{part.Name}</p>
			</div>
		</li>
	{/each}
</ul>
