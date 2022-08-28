<script lang="ts">
	import { formatNumber } from '$lib/util/format-number';
	import { qiRecoveryStore } from './stores/qi-recovery-balance-store';

	let className: string;
	export { className as class };

	$: delta =
		$qiRecoveryStore.globalRecovery.total +
		$qiRecoveryStore.equippedRecovery.total -
		$qiRecoveryStore.equippedCost.total;
</script>

<div class={className}>
	Equipped Qi Cost: {formatNumber($qiRecoveryStore.equippedCost.total, {
		rate: true,
		precision: 0
	})}
</div>
<div class={className}>
	Total Qi Recovery: {formatNumber(
		$qiRecoveryStore.equippedRecovery.total + $qiRecoveryStore.globalRecovery.total,
		{
			rate: true,
			precision: 0
		}
	)}
</div>
<div class={className}>Net Qi Recovery: {formatNumber(delta, { rate: true, precision: 0 })}</div>
