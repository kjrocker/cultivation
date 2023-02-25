<script lang="ts">
	let isHovered = false;
	let x: number;
	let y: number;
	export let disabled = false;

	function mouseOver(event: MouseEvent) {
		isHovered = true;
		x = event.pageX + 5;
		y = event.pageY + 5;
	}
	function mouseMove(event: any) {
		x = event.pageX + 5;
		y = event.pageY + 5;
	}
	function mouseLeave() {
		isHovered = false;
	}

	let className = '';
	export { className as class };
</script>

<div
	on:mouseover={mouseOver}
	on:mouseleave={mouseLeave}
	on:mousemove={mouseMove}
	on:click
	class={className}
>
	<slot />
</div>

{#if isHovered && !disabled}
	<div style="top: {y}px; left: {x}px;" class="tooltip"><slot name="tooltip" /></div>
{/if}

<style>
	.tooltip {
		border: 1px solid #ddd;
		box-shadow: 1px 1px 1px #ddd;
		background: white;
		border-radius: 4px;
		padding: 4px;
		position: absolute;
		z-index: 10000;
	}
	@media (prefers-color-scheme: dark) {
		.tooltip {
			color: #c9d1d9;
			background: #0d1117;
		}
	}
</style>
