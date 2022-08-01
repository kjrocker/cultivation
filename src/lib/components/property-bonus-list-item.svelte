<script lang="ts">
	import { formatNumber } from '$lib/util/format-number';
	import type { PartProperty } from '$lib/util/part-properties';

	import { clamp } from 'ramda';
	import Tooltip from './base/tooltip.svelte';

	export let name: string;
	export let displayName: string;
	export let max = Infinity;
	export let min = -Infinity;
	export let percentage = false;
	export let rate = false;
	export let base = 0;

	export let bonuses: PartProperty | undefined;

	const calculateTotal = (bonuses: PartProperty | undefined, key: 'AddV' | 'BAddV' | 'AddP') => {
		if (!bonuses) return 0;
		const value = bonuses[key] ?? 0;
		return value;
	};

	$: baseValue = base + calculateTotal(bonuses, 'BAddV');
	$: basePercent = 1 + calculateTotal(bonuses, 'AddP');
	$: bonusValue = calculateTotal(bonuses, 'AddV');
	$: total = baseValue * basePercent + bonusValue;
	$: clamped = clamp(min, max, total);
</script>

<Tooltip>
	<svelte:fragment slot="tooltip">
		<p>{displayName}</p>
		<p>Base Value: {formatNumber(baseValue, { percentage, rate })}</p>
		<p>Percentage: {formatNumber(basePercent, { percentage: true })}</p>
		<p>Bonus: {formatNumber(bonusValue, { percentage, rate })}</p>
	</svelte:fragment>
	<div class="mx-2 py-1">
		<span>
			{displayName}:
		</span>
		<span>
			{formatNumber(clamped, { percentage, rate, precision: 2 })}
		</span>
	</div>
</Tooltip>
