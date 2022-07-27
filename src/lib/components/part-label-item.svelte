<script lang="ts">
	import type { LabelView } from '$lib/data/get-labels';
	import { Icon } from '@steeze-ui/svelte-icon';
	import BodyTypeIcon from './body-parts/body-type-icon.svelte';
	import { CheckCircle } from '@steeze-ui/iconic-free';

	export let onClick: (e: MouseEvent, label: LabelView) => void;
	export let label: LabelView;
	export let selected: boolean;

	const levelColors = {
		1: 'text-orange-600',
		4: 'text-pink-500',
		9: 'text-blue-600',
		16: 'text-green-600'
	};

	// @ts-expect-error
	$: color = levelColors[label.MaxLevel] ?? 'text-gray-900';
</script>

<li class="p-2 flex hover:bg-gray-50" on:click={(e) => onClick(e, label)}>
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
		<!-- <p class="text-sm text-gray-500">{label.LinkItem}</p> -->
	</div>
</li>
