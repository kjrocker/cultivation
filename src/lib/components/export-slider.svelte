<script lang="ts">
	import Slider from './base/slider.svelte';
	import ExportForm from './export-form.svelte';

	export let open: boolean;
</script>

<Slider title="Export Cultivator" bind:open>
	<ExportForm />
</Slider>
