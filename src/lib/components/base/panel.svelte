<script lang="ts">
	const className: string = '';
	export { className as class };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click class={`border border-stone-400 rounded-md my-2 ${className}`}>
	<slot />
</div>
