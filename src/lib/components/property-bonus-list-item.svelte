<script lang="ts">
	import type { PartProperty } from '$lib/util/part-properties';

	import { min, sum } from 'ramda';
	import Tooltip from './base/tooltip.svelte';

	export let name: string;
	export let displayName: string;
	export let max: number = Infinity;
	export let percentage: boolean = false;
	export let rate: boolean = false;

	export let bonuses: PartProperty | undefined;

	const calculateTotal = (
		bonuses: PartProperty | undefined,
		key: 'AddV' | 'BAddV' | 'AddP',
		percentage: boolean = false
	) => {
		if (!bonuses) return 0;
		const value = bonuses[key] ?? 0;
		return percentage ? value * 100 : value;
	};

	$: baseValue = calculateTotal(bonuses, 'BAddV');
	$: basePercent = 1 + calculateTotal(bonuses, 'AddP');
	$: bonusValue = calculateTotal(bonuses, 'AddV');
	$: total = min(baseValue * basePercent + bonusValue, max);
</script>

<Tooltip>
	<svelte:fragment slot="tooltip">
		<p>{displayName}</p>
		<p>Base Value: {Math.round(percentage ? baseValue * 100 : baseValue)}</p>
		<p>Percentage: {Math.round(basePercent * 100)}%</p>
		<p>Bonus: {Math.round(percentage ? bonusValue * 100 : bonusValue)}</p>
	</svelte:fragment>
	<div class="mx-2 py-1">
		<span>
			{displayName}:
		</span>
		<span>
			{percentage
				? `${Math.round(total * 100)}%`
				: rate
				? `${Math.round(total)}/s`
				: `${Math.round(total)}`}
		</span>
	</div>
</Tooltip>
