<script lang="ts">
	import { secretBodyStore } from '$lib/data/stores';
	import { completeSecretBodiesStore } from './stores/complete-secret-bodies-store';
	import {
		equippedSecretBodyStore,
		type EquippedSecretBodyStore
	} from './stores/equipped-secret-bodies-store';
	import Checkbox from './base/checkbox.svelte';

	const classes = {
		label: 'block text-md font-medium text-gray-700',
		checkbox: 'h-4 w-4 mb-1',
		checkboxLabel: 'min-w-[150px] inline-block',
		select:
			'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-md border-gray-800 rounded-md px-1 py-0 mt-1'
	};

	const createChangeHandler = (type: keyof EquippedSecretBodyStore) => {
		return ({ target }: any) => {
			const { value, checked } = target;
			if (checked) {
				equippedSecretBodyStore.add(type, value);
			} else {
				equippedSecretBodyStore.remove(type, value);
			}
		};
	};

	$: availableBodies = Object.keys($completeSecretBodiesStore).filter(
		(k) => $completeSecretBodiesStore[k]
	);
</script>

<label for="offensive" class={classes.label}>Offensive</label>
{#each availableBodies as body}
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
{/each}

<label for="defensive" class={classes.label}>Defensive</label>
{#each availableBodies as body}
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
{/each}

<label for="effective" class={classes.label}>Effective</label>
{#each availableBodies as body}
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
{/each}
