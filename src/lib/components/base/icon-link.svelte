<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { GithubLogo } from '@steeze-ui/radix-icons';

	export let href: string;
	let className = '';
	export { className as class };
</script>

<a {href} class={className} target="_blank" on:click>
	<Icon src={GithubLogo} />
</a>
