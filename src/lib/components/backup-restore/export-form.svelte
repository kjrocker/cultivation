<script lang="ts">
	import { captureState } from '$lib/core/backup';
	import { cultivator, gameData } from '$lib/stores';
	import Button from '../base/button.svelte';

	$: options = window.btoa(JSON.stringify(captureState($gameData, $cultivator)));
</script>

<textarea
	class="w-full bg-slate-100 dark:bg-slate-700"
	name="cultivator"
	bind:value={options}
	rows="25"
	readonly
/>
<Button on:click={() => navigator.clipboard.writeText(options)}>Copy to Clipboard</Button>
