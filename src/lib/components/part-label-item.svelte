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

<Tooltip class="p-2 flex hover:bg-gray-100" on:click={(e) => onClick(e, label)}>
	<svelte:fragment slot="tooltip">
		<PropertyTooltip
			properties={label.SuperPartProperties}
			modifiers={label.Modifier}
			level={label.MaxLevel}
		/>
	</svelte:fragment>
	<BodyTypeIcon className="h-10 w-10" type={label.BodyPart} />
	<div class="ml-3 mr-5 w-full">
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
