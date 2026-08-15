<script lang="ts" context="module">
	let count = 0;
</script>

<script lang="ts">
	let visible = false;
	let x: number;
	let y: number;
	export let disabled = false;

	// exposed as a slot prop so the trigger can `aria-describedby` the tooltip
	export const describedBy = `tooltip-${count++}`;

	function mouseOver(event: MouseEvent) {
		visible = true;
		mouseMove(event);
	}
	function mouseMove(event: any) {
		x = event.pageX + 5;
		y = event.pageY + 5;
	}
	function hide() {
		visible = false;
	}
	// keyboard users get the same tooltip, anchored under the focused element
	function focusIn(event: FocusEvent) {
		const rect = (event.target as HTMLElement).getBoundingClientRect();
		x = rect.left + window.scrollX + 5;
		y = rect.bottom + window.scrollY + 5;
		visible = true;
	}

	let className = '';
	export { className as class };
</script>

<div
	on:mouseover={mouseOver}
	on:mouseleave={hide}
	on:mousemove={mouseMove}
	on:focus|capture={focusIn}
	on:blur|capture={hide}
	class={className}
>
	<slot {describedBy} />
</div>

{#if visible && !disabled}
	<div id={describedBy} role="tooltip" style="top: {y}px; left: {x}px;" class="tooltip">
		<slot name="tooltip" />
	</div>
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
