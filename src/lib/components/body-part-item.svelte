<script lang="ts">
	import type { BodyPart } from '$lib/data/get-body-parts';
	import { validateBodyPart } from '$lib/util/validate-body-part';
	import BodyTypeIcon from './body-parts/body-type-icon.svelte';
	import { getRemoldCount } from '../util/get-remold-count';
	import { remoldOptions } from './forms/remold-options/remold-options-store';
	import { partLabelStore } from './stores/part-label-store';

	export let selected: boolean;
	export let labelCount: number;
	export let part: BodyPart;
	export let onClick: (e: MouseEvent, p: BodyPart) => void = () => undefined;

	$: remoldCount = getRemoldCount(part.Kind, $remoldOptions);
	$: error = validateBodyPart(part.Name, $partLabelStore, remoldCount);
</script>

<li class="py-2 flex hover:bg-gray-50" on:click={(e) => onClick(e, part)}>
	<BodyTypeIcon className="h-10 w-10" type={part.Kind} />
	<div class="ml-3 mr-5 w-full">
		<div class="flex justify-between">
			<span
				class={`text-sm ${selected ? 'font-extrabold' : 'font-medium'} ${
					!error ? 'text-gray-900' : 'text-red-400'
				}`}
			>
				{part.DisplayName}
			</span>
			<span class={`"text-sm font-medium ${!error ? 'text-gray-900' : 'text-red-400'}`}>
				{labelCount}/{remoldCount}
			</span>
		</div>
		{#if error}
			<p class="text-sm text-red-400">
				{error}
			</p>
		{/if}
	</div>
</li>
