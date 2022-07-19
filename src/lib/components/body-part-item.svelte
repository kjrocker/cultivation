<script lang="ts">
	import type { BodyPart } from '$lib/data/get-body-parts';
	import BodyTypeIcon from './body-parts/body-type-icon.svelte';
	import { getRemoldCount } from './forms/remold-options/get-remold-count';
	import { remoldOptions } from './forms/remold-options/remold-options-store';

	export let selected: boolean;
	export let labelCount: number;
	export let part: BodyPart;
	export let onClick: (e: MouseEvent, p: BodyPart) => void = () => undefined;

	$: remoldCount = getRemoldCount(part.Kind, $remoldOptions);
	$: valid = labelCount <= remoldCount;
</script>

<li class="py-2 flex hover:bg-gray-50" on:click={(e) => onClick(e, part)}>
	<BodyTypeIcon className="h-10 w-10" type={part.Kind} />
	<div class="ml-3 mr-5 w-full">
		<div class="flex justify-between">
			<span class={`text-sm ${selected ? 'font-bold' : 'font-medium'} text-gray-900`}>
				{part.DisplayName}
			</span>
			<span class={`"text-sm font-medium ${valid ? 'text-gray-900' : 'text-red-400'}`}>
				{labelCount}/{remoldCount}
			</span>
		</div>
		<p class="text-sm text-gray-500">
			{part.Kind}
		</p>
	</div>
</li>
