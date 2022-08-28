<script lang="ts">
	const className: string = '';
	export { className as class };
</script>

<div on:click class={`border rounded-md my-2 ${className}`}>
	<slot />
</div>
