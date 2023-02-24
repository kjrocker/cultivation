<script lang="ts">
	import { essenceStore } from '$lib/data/stores';
	import type { EssenceName, LabelView } from '$lib/data/types';
	import { CheckCircle } from '@steeze-ui/iconic-free';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { identity } from 'ramda';
	import Tooltip from './base/tooltip.svelte';
	import BodyTypeIcon from './body-parts/body-type-icon.svelte';
	import PropertyTooltip from './property-tooltip.svelte';

	export let onClick: (e: MouseEvent, label: LabelView) => void;
	export let label: LabelView;
	export let selected: boolean;

	const levelColors = {
		1: 'text-orange-600',
		4: 'text-pink-500',
		9: 'text-blue-600',
		16: 'text-green-600'
	};

	const getEssences = (linkItem: string, essences: Record<string, EssenceName>): string => {
		const names = linkItem.split('|');
		const essenceNames = names.map((name) => essences[name].ThingName).filter(identity);
		return essenceNames.length !== 0 ? essenceNames.join(', ') : 'All';
	};

	// @ts-expect-error index mismatch is what the default is there for
	$: color = levelColors[label.MaxLevel] ?? 'text-gray-900';
	$: items = label.LinkItem ? getEssences(label.LinkItem, $essenceStore.map) : 'All';
</script>

<div
	class="p-2 flex hover:bg-gray-100 cursor-pointer"
	class:selected
	on:click={(e) => onClick(e, label)}
>
	<Tooltip class="flex w-full">
		<svelte:fragment slot="tooltip">
			<PropertyTooltip
				properties={label.SuperPartProperties}
				modifiers={label.Modifier}
				level={label.MaxLevel}
			/>
		</svelte:fragment>
		<BodyTypeIcon className="h-10 w-10" type={label.BodyPart} />
		<div class="ml-2 mr-2 w-full">
			<div class="flex justify-between">
				<span class={`text-sm ${selected ? 'font-extrabold' : 'font-medium'} ${color}`}>
					{label.DisplayName}
				</span>
				{#if selected}
					<Icon class="w-5 h-5 text-green-400" src={CheckCircle} />
				{/if}
			</div>
			<p class="text-sm text-gray-500 max-w-xs overflow-ellipsis">
				{items}
			</p>
		</div>
	</Tooltip>
</div>

<style>
	.selected {
		--tw-text-opacity: 1;
		border-left: 8px solid rgb(74 222 128) !important;
		/* background-color: rgb(240, 250, 240); */
	}
	.selected:hover {
		/* background-color: rgb(220, 220, 230); */
	}
</style>
