<script lang="ts">
	import { bodyLawStore } from '$lib/data/get-body-laws';
	import { bodyPartsStore } from '$lib/data/get-body-parts';
	import { SPECIES_OPTIONS } from '$lib/data/species';
	import { partLabelCountStore } from '../stores/part-label-count-store';
	import { bodyOptionsStore, bodyOptionsStore as options } from './options-store';

	const resetPartLabels = () => {
		partLabelCountStore.setParts($bodyPartsStore.species[$bodyOptionsStore.species.key]);
	};
</script>

<div class="flex w-full justify-center mb-4">
	<div class="mx-4">
		<h2 class="text-lg underline">Cultivator</h2>
		<select
			class="w-full"
			bind:value={$options.species}
			on:change={() => {
				resetPartLabels();
			}}
		>
			{#each SPECIES_OPTIONS as spec}
				<option value={spec}>{spec.name}</option>
			{/each}
		</select>

		<select class="w-full" bind:value={$options.law}>
			{#each $bodyLawStore.list as law}
				<option value={law}>{law.DisplayName}</option>
			{/each}
		</select>
	</div>
	<div>
		<div>
			<h2 class="text-lg underline">Label Count</h2>
			<label htmlfor="temperedHeart">
				<input
					name="temperedHeart"
					bind:checked={$options.temperedHeart}
					type="checkbox"
					class="h-4 w-4"
				/>
				Tempered Heart
			</label>
			<label htmlfor="temperedBrain">
				<input name="temperedBrain" bind:checked={$options.temperedBrain} type="checkbox" />
				Tempered Brain
			</label>
			<label htmlfor="temperedSpine">
				<input name="temperedSpine" bind:checked={$options.temperedSpine} type="checkbox" />
				Tempered Spine
			</label>
		</div>
		<div>
			<label htmlfor="fireSpine">
				<input name="fireSpine" bind:checked={$options.fireSpine} type="checkbox" />
				Firestruck Spine
			</label>
			<label htmlfor="illusionBrain">
				<input name="illusionBrain" bind:checked={$options.illusionBrain} type="checkbox" />
				Illusionary Brain
			</label>
			<label htmlfor="transcendantHeart">
				<input name="transcendantHeart" bind:checked={$options.transcendantHeart} type="checkbox" />
				Transcendant Heart
			</label>
		</div>
	</div>
</div>
