<script lang="ts">
	let className = '';
	export { className as class };
</script>

<button
	type="button"
	class={`inline-flex items-center px-2 py-1 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
	on:click
>
	<slot />
</button>
