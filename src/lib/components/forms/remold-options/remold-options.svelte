<script lang="ts">
	import { remoldOptions as options } from './remold-options-store';
</script>

<label htmlfor="temperedHeart">
	<input name="temperedHeart" bind:checked={$options.temperedHeart} type="checkbox" />
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
