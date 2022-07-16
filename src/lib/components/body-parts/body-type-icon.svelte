<script lang="ts">
	export let type: 'Flesh' | 'Organ' | 'Bone';
	export let className: string;
	import bone from './bone.png';
	import organ from './organ.png';
	import flesh from './flesh.png';
	import any from './any.png';
</script>

{#if type === 'Organ'}
	<img class={className} alt="Organ" src={organ} />
{:else if type === 'Flesh'}
	<img class={className} alt="Flesh" src={flesh} />
{:else if type === 'Bone'}
	<img class={className} alt="Bone" src={bone} />
{:else}
	<img class={className} alt="Unknown" src={any} />
{/if}
