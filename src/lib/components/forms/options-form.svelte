<script lang="ts">
	import { bodyLawStore } from '$lib/data/stores';
	import { bodyPartsStore } from '$lib/data/stores';
	import { SPECIES_OPTIONS } from '$lib/data/species';
	import { partLabelCountStore } from '../stores/part-label-count-store';
	import { selectedStore } from '../stores/selected-store';
	import { bodyOptionsStore as options } from '../stores/options-store';

	const resetPartLabels = () => {
		partLabelCountStore.setParts($bodyPartsStore.species[$options.species]);
	};

	const classes = {
		label: 'block text-md font-medium text-gray-700',
		checkbox: 'h-4 w-4 mb-1',
		checkboxLabel: 'min-w-[150px] inline-block',
		select:
			'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-md border-gray-800 rounded-md h-8 px-1 py-0 mt-1'
	};

	$: {
		if ($options.law === 'Body_Gong_2') {
			$options.illusionBrain = false;
			$options.transcendantHeart = false;
		} else if ($options.law === 'Body_Gong_3') {
			$options.fireSpine = false;
			$options.transcendantHeart = false;
		} else if ($options.law === 'Body_Gong_5') {
			$options.fireSpine = false;
			$options.illusionBrain = false;
		} else if ($options.law === 'Body_Gong_1') {
			$options.fireSpine = false;
			$options.illusionBrain = false;
			$options.transcendantHeart = false;
		}
	}
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
				selectedStore.clear();
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
				$options.law !== 'Body_Gong_2' ? 'line-through cursor-not-allowed' : ''
			}`}
		>
			<input
				name="fireSpine"
				bind:checked={$options.fireSpine}
				type="checkbox"
				class={`${classes.checkbox} ${
					$options.law !== 'Body_Gong_2' ? 'bg-gray-500 cursor-not-allowed' : ''
				}`}
				disabled={$options.law !== 'Body_Gong_2'}
			/>
			Firestruck Spine
		</label>
		<label
			class={`${classes.checkboxLabel} ${
				$options.law !== 'Body_Gong_3' ? 'line-through cursor-not-allowed' : ''
			}`}
		>
			<input
				name="illusionBrain"
				bind:checked={$options.illusionBrain}
				type="checkbox"
				class={`${classes.checkbox} ${
					$options.law !== 'Body_Gong_3' ? 'bg-gray-500 cursor-not-allowed' : ''
				}`}
				disabled={$options.law !== 'Body_Gong_3'}
			/>
			Illusionary Brain
		</label>
		<label
			class={`${classes.checkboxLabel} ${
				$options.law !== 'Body_Gong_5' ? 'line-through cursor-not-allowed' : ''
			}`}
		>
			<input
				name="transcendantHeart"
				bind:checked={$options.transcendantHeart}
				type="checkbox"
				class={`${classes.checkbox} ${
					$options.law !== 'Body_Gong_5' ? 'bg-gray-500 cursor-not-allowed' : ''
				}`}
				disabled={$options.law !== 'Body_Gong_5'}
			/>
			Transcendant Heart
		</label>
	</div>
</div>
