<script lang="ts">
	import { formatNumber } from '$lib/util/format-number';
	import { qiRecoveryStore } from './stores/qi-recovery-balance-store';

	$: delta =
		$qiRecoveryStore.globalRecovery.total +
		$qiRecoveryStore.equippedRecovery.total -
		$qiRecoveryStore.equippedCost.total;
</script>

<span>Net Qi Recovery: {formatNumber(delta, { rate: true, precision: 0 })}</span>
