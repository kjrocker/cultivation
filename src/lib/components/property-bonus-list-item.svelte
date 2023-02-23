<script lang="ts">
	import { formatNumber } from '$lib/util/format-number';
	import type { PartProperty } from '$lib/data/util/part-properties';
	import { calculatePropertyItem } from '$lib/util/total-property-item';
	import Tooltip from './base/tooltip.svelte';
	import {
		globalPercentageBonusStore,
		globalValueBonusStore
	} from './stores/global-body-bonuses-store';

	export let name: string;
	export let displayName: string;
	export let max = Infinity;
	export let min = -Infinity;
	export let percentage = false;
	export let rate = false;
	export let base = 0;
	export let tooltip = true;
	export let containerClasses = '';

	export let bonuses: PartProperty | undefined;

	// @ts-expect-error Blah blah blah
	$: globalPercentBonus = $globalPercentageBonusStore[name];
	// @ts-expect-error Blah blah blah the second
	$: globalValueBonus = $globalValueBonusStore[name];
	$: totals = calculatePropertyItem(bonuses, {
		max,
		min,
		base,
		gAddP: globalPercentBonus?.total,
		gAddV: globalValueBonus?.total
	});
</script>

<Tooltip disabled={!tooltip}>
	<svelte:fragment slot="tooltip">
		<p>{displayName}</p>
		<p>Base Value: {formatNumber(totals.baseValue, { percentage, rate })}</p>
		<p>Percentage: {formatNumber(totals.percentBonus, { percentage: true })}</p>
		{#if globalPercentBonus && globalPercentBonus.total !== 0}
			<p>
				Global Percentage: {formatNumber(globalPercentBonus.total, {
					percentage: true,
					precision: 0
				})}
			</p>
		{/if}
		<p>Bonus: {formatNumber(totals.bonusValue, { percentage, rate })}</p>
		{#if globalValueBonus && globalValueBonus.total !== 0}
			<p>
				Global Bonus: {formatNumber(globalValueBonus.total, {
					percentage,
					rate,
					precision: 0
				})}
			</p>
		{/if}
	</svelte:fragment>
	<div class="mx-2 py-1">
		<span>
			{displayName}:
		</span>
		<span>
			{formatNumber(totals.total, { percentage, rate, precision: 2 })}
		</span>
	</div>
</Tooltip>
