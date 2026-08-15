<script lang="ts">
	import type { EquippedSecretBodies } from '$lib/core/types';
	import {
		actions,
		completeSecretBodiesStore,
		equippedSecretBodyStore,
		secretBodyStore
	} from '$lib/stores';
	import Checkbox from './base/checkbox.svelte';

	const createChangeHandler = (type: keyof EquippedSecretBodies) => {
		return ({ target }: any) => {
			const { value, checked } = target;
			if (checked) {
				actions.equipBody(type, value);
			} else {
				actions.unequipBody(type, value);
			}
		};
	};

	$: availableBodies = Object.keys($completeSecretBodiesStore).filter(
		(k) => $completeSecretBodiesStore[k]
	);
</script>

<label for="offensive" class="block text-lg py-1 border-b-2 mb-1">Offensive</label>
<div class="flex flex-row flex-wrap mb-1">
	{#each availableBodies as body}
		<div class="w-1/2 py-0.5">
			<Checkbox
				name="offensive"
				disabled={[
					...$equippedSecretBodyStore.defensive,
					...$equippedSecretBodyStore.effective
				].includes(body)}
				on:change={createChangeHandler('offensive')}
				checked={$equippedSecretBodyStore.offensive.includes(body)}
				text={$secretBodyStore.map[body].DisplayName}
				value={body}
			/>
		</div>
	{/each}
</div>

<label for="defensive" class="block text-lg py-1 border-b-2 mb-1">Defensive</label>
<div class="flex flex-row flex-wrap mb-1">
	{#each availableBodies as body}
		<div class="w-1/2 py-0.5">
			<Checkbox
				name="defensive"
				disabled={[
					...$equippedSecretBodyStore.offensive,
					...$equippedSecretBodyStore.effective
				].includes(body)}
				on:change={createChangeHandler('defensive')}
				checked={$equippedSecretBodyStore.defensive.includes(body)}
				text={$secretBodyStore.map[body].DisplayName}
				value={body}
			/>
		</div>
	{/each}
</div>

<label for="effective" class="block text-lg py-1 border-b-2 mb-1">Effective</label>
<div class="flex flex-row flex-wrap mb-1">
	{#each availableBodies as body}
		<div class="w-1/2 py-0.5">
			<Checkbox
				name="effective"
				disabled={[
					...$equippedSecretBodyStore.offensive,
					...$equippedSecretBodyStore.defensive
				].includes(body)}
				on:change={createChangeHandler('effective')}
				checked={$equippedSecretBodyStore.effective.includes(body)}
				text={$secretBodyStore.map[body].DisplayName}
				value={body}
			/>
		</div>
	{/each}
</div>
