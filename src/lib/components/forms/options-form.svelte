<script lang="ts">
	import { isTemperingAllowed } from '$lib/core/defaults';
	import { SPECIES_OPTIONS } from '$lib/data/species';
	import { actions, bodyLawStore, bodyPartsStore, bodyOptionsStore as options } from '$lib/stores';

	const resetPartLabels = () => {
		actions.setParts($bodyPartsStore.species[$options.species]);
	};

	const classes = {
		label: 'block text-md font-medium',
		checkbox: 'h-4 w-4 mb-1',
		checkboxLabel: 'min-w-[150px] inline-block',
		select:
			'shadow-sm focus:ring-indigo-500 text-gray-900 focus:border-indigo-500 block w-full text-md border-gray-800 rounded-md h-8 px-1 py-0 mt-1'
	};

	// Which extra tempering the current law unlocks; the other two are cleared on
	// every write by `normalizeOptions` in the core.
	$: allowsFireSpine = isTemperingAllowed($options.law, 'fireSpine');
	$: allowsIllusionBrain = isTemperingAllowed($options.law, 'illusionBrain');
	$: allowsTranscendantHeart = isTemperingAllowed($options.law, 'transcendantHeart');
</script>

<div class="flex flex-wrap">
	<div class="mx-2 min-w-[200px]">
		<label for="name" class={classes.label}>Name</label>
		<input type="text" name="name" id="name" class={classes.select} bind:value={$options.name} />
	</div>
	<div class="mx-2 min-w-[110px]">
		<label for="species" class={classes.label}>Species</label>
		<select
			name="species"
			class={classes.select}
			bind:value={$options.species}
			on:change={() => {
				resetPartLabels();
			}}
		>
			{#each SPECIES_OPTIONS as spec}
				<option value={spec.key}>{spec.name}</option>
			{/each}
		</select>
	</div>
	<div class="mx-2 min-w-[200px]">
		<label for="law" class={classes.label}>Law</label>
		<select
			name="law"
			class={classes.select}
			bind:value={$options.law}
			on:change={() => {
				actions.clearSelection();
			}}
		>
			{#each $bodyLawStore.list as law}
				<option value={law.Name}>{law.DisplayName.replaceAll('Body', '').trim()}</option>
			{/each}
		</select>
	</div>
</div>
<div>
	<div>
		<h2 class={classes.label}>Label Count</h2>
		<label class={classes.checkboxLabel}>
			<input
				name="temperedHeart"
				bind:checked={$options.temperedHeart}
				type="checkbox"
				class={classes.checkbox}
			/>
			Tempered Heart
		</label>
		<label class={classes.checkboxLabel}>
			<input
				name="temperedBrain"
				bind:checked={$options.temperedBrain}
				type="checkbox"
				class={classes.checkbox}
			/>
			Tempered Brain
		</label>
		<label class={classes.checkboxLabel}>
			<input
				name="temperedSpine"
				bind:checked={$options.temperedSpine}
				type="checkbox"
				class={classes.checkbox}
			/>
			Tempered Spine
		</label>
	</div>
	<div>
		<label
			class={`${classes.checkboxLabel} ${
				!allowsFireSpine ? 'line-through cursor-not-allowed' : ''
			}`}
		>
			<input
				name="fireSpine"
				bind:checked={$options.fireSpine}
				type="checkbox"
				class={`${classes.checkbox} ${!allowsFireSpine ? 'bg-gray-500 cursor-not-allowed' : ''}`}
				disabled={!allowsFireSpine}
			/>
			Firestruck Spine
		</label>
		<label
			class={`${classes.checkboxLabel} ${
				!allowsIllusionBrain ? 'line-through cursor-not-allowed' : ''
			}`}
		>
			<input
				name="illusionBrain"
				bind:checked={$options.illusionBrain}
				type="checkbox"
				class={`${classes.checkbox} ${
					!allowsIllusionBrain ? 'bg-gray-500 cursor-not-allowed' : ''
				}`}
				disabled={!allowsIllusionBrain}
			/>
			Illusionary Brain
		</label>
		<label
			class={`${classes.checkboxLabel} ${
				!allowsTranscendantHeart ? 'line-through cursor-not-allowed' : ''
			}`}
		>
			<input
				name="transcendantHeart"
				bind:checked={$options.transcendantHeart}
				type="checkbox"
				class={`${classes.checkbox} ${
					!allowsTranscendantHeart ? 'bg-gray-500 cursor-not-allowed' : ''
				}`}
				disabled={!allowsTranscendantHeart}
			/>
			Transcendant Heart
		</label>
	</div>
</div>
