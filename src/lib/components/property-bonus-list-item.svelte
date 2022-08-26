<script lang="ts">
	import { formatNumber } from '$lib/util/format-number';
	import type { PartProperty } from '$lib/util/part-properties';
	import { calculatePropertyItem } from '$lib/util/total-property-item';
	import Tooltip from './base/tooltip.svelte';

	export let name: string;
	export let displayName: string;
	export let max = Infinity;
	export let min = -Infinity;
	export let percentage = false;
	export let rate = false;
	export let base = 0;

	export let bonuses: PartProperty | undefined;

	$: totals = calculatePropertyItem(bonuses, { max, min, base });
</script>

<Tooltip>
	<svelte:fragment slot="tooltip">
		<p>{displayName} {name}</p>
		<p>Base Value: {formatNumber(totals.baseValue, { percentage, rate })}</p>
		<p>Percentage: {formatNumber(totals.percentBonus, { percentage: true })}</p>
		<p>Bonus: {formatNumber(totals.bonusValue, { percentage, rate })}</p>
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
