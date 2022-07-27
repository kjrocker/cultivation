<script lang="ts">
	let className: string = '';
	export { className as class };
</script>

<div
	class={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium text-red-800 bg-red-200 ${className}`}
	on:click
>
	<slot />
</div>
