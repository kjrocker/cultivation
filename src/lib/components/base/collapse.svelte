<script lang="ts">
	import { slide } from 'svelte/transition';
	export let defaultOpen = false;
	let isOpen = defaultOpen;
	const toggle = () => (isOpen = !isOpen);
	export let buttonClasses = '';
</script>

<button class={buttonClasses} on:click={toggle} aria-expanded={isOpen}>
	<slot name="header" />
	<slot name="svg">
		<svg
			style="tran"
			width="20"
			height="20"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path d="M9 5l7 7-7 7" />
		</svg>
	</slot>
</button>

{#if isOpen}
	<div transition:slide={{ duration: 300 }}>
		<slot />
	</div>
{/if}

<style>
	button {
		display: flex;
		align-items: center;
		border: none;
		background: none;
		color: inherit;
		cursor: pointer;
		margin: 0;
	}

	svg {
		display: inline;
		transition: transform 0.2s ease-in;
	}

	[aria-expanded='true'] svg {
		transform: rotate(0.25turn);
	}
</style>
