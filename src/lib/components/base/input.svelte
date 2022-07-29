<script lang="ts">
	export let value: svelte.JSX.HTMLAttributes<HTMLInputElement>['value'];
	export let name: string;
	export const type: string = '';
</script>

<div>
	<label for={name} class="block text-sm font-medium text-gray-700">Email</label>
	<div class="mt-1">
		<input
			{type}
			{name}
			id="email"
			class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
			on:change
			on:input
			bind:value
		/>
	</div>
</div>
