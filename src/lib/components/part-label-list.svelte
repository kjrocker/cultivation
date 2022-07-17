<script lang="ts">
	import { filterLabelByPart } from '$lib/data/filter-labels-by-part';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { MinusCircle } from '@steeze-ui/iconic-free';
	import type { BodyPart } from '$lib/data/get-body-parts';
	import { getLabels, type LabelView } from '$lib/data/get-labels';
	import { sortBy } from 'ramda';
	import { onMount } from 'svelte';
	import BodyTypeIcon from './body-parts/body-type-icon.svelte';

	let labels: LabelView[] = [];

	export let onChange: (e: MouseEvent, label: LabelView[]) => void = () => undefined;
	export let selected: LabelView[] = [];
	export let bodyPart: BodyPart;

	onMount(async () => {
		labels = await getLabels();
	});

	const handleAdd = (e: MouseEvent, label: LabelView, add = true) => {
		selected = [...selected, label];
		onChange(e, selected);
	};

	const handleRemove = (e: MouseEvent, label: LabelView, add = true) => {
		selected = selected.filter((l) => l.Name !== label.Name);
		onChange(e, selected);
	};

	const levelColors = {
		1: 'text-orange-600',
		4: 'text-pink-500',
		9: 'text-blue-600',
		16: 'text-green-600'
	};
	const getColor = (level: number): string => {
		return levelColors[level] ?? 'text-gray-900';
	};

	$: filteredLabels = sortBy(
		(view) =>
			selected.find((l) => l.Name === view.Name) ? view.MaxLevel * -1000 : view.MaxLevel * -1,
		labels.filter((label) => filterLabelByPart(bodyPart, label))
	);
</script>

<ul class="divide-y divide-gray-200 w-1/3 max-h-[90vh] overflow-y-auto overflow-x-hidden">
	{#each filteredLabels as part, i}
		{#if selected.find((l) => l.Name === part.Name)}
			<li class="py-2 flex bg-gray-50" on:click={(e) => handleRemove(e, part)}>
				<BodyTypeIcon className="h-10 w-10" type={part.BodyPart} />
				<div class="ml-3">
					<p class={`text-sm font-bold ${getColor(part.MaxLevel)}`}>
						{part.DisplayName}
					</p>
					<p class="text-sm text-gray-500">{part.Name}</p>
				</div>
			</li>
		{:else}
			<li class="py-2 flex" on:click={(e) => handleAdd(e, part)}>
				<BodyTypeIcon className="h-10 w-10" type={part.BodyPart} />
				<div class="ml-3">
					<p class={`text-sm font-medium ${getColor(part.MaxLevel)}`}>{part.DisplayName}</p>
					<p class="text-sm text-gray-500">{part.Name}</p>
				</div>
			</li>
		{/if}
	{/each}
</ul>
