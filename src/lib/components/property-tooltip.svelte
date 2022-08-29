<script lang="ts">
	import { modifierStore } from '$lib/data/stores';
	import { PropertyConfiguration } from '$lib/data/property-config';
	import { sumAndGroupProperties } from '$lib/util/get-all-modifier-groups';
	import type { PartProperty } from '$lib/data/types';
	import { propertyToString } from '$lib/util/property-to-tooltip-string';
	import { values } from 'ramda';

	export let properties: PartProperty[] | undefined = [];
	let modifierNames: string[] | undefined;
	export let level: number;
	export { modifierNames as modifiers };

	$: modifiers = modifierNames
		? modifierNames.map((name) => $modifierStore.map[name]).filter((v) => v)
		: undefined;
	$: regularProps = values(sumAndGroupProperties(properties ?? []));
	$: modifierProps = values(sumAndGroupProperties(modifiers?.flatMap((m) => m.Properties) ?? []));
</script>

{#each regularProps as prop}
	<p>
		{PropertyConfiguration[prop.Name].DisplayName ?? prop.Name}
		{propertyToString(prop, level, PropertyConfiguration[prop.Name])}
	</p>
{/each}
{#each modifierProps as prop}
	<p>{prop.DisplayName} {propertyToString(prop, level, PropertyConfiguration[prop.Name])}</p>
{/each}
