<script lang="ts">
	import Slider from './base/slider.svelte';
	import ImportForm from './import-form.svelte';

	export let open: boolean;
</script>

<Slider title="Import Cultivator" bind:open>
	<ImportForm />
</Slider>
