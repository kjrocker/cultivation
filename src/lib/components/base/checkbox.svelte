<script lang="ts">
	export let name: string;
	export let checked: boolean;
	export let value: any;
	export let disabled = false;
	export let text: string;
</script>

<label class={`block`}>
	<input
		type="checkbox"
		class="disabled:bg-gray-500"
		on:change
		on:blur
		on:focus
		{name}
		{checked}
		{value}
		{disabled}
	/>
	<span class={`${disabled ? 'line-through' : ''}`}>{text}</span>
</label>
