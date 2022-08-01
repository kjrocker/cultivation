<script lang="ts">
	import { modifierStore } from '$lib/data/get-modifiers';
	import { PropertyConfiguration } from '$lib/data/property-config';
	import { sumAndGroupProperties } from '$lib/util/get-all-modifier-groups';
	import type { PartProperty } from '$lib/util/part-properties';
	import { values } from 'ramda';

	export let properties: PartProperty[] | undefined = [];
	let modifierNames: string[] | undefined;
	export let level: number;
	export { modifierNames as modifiers };

	const propertyToString = <T extends PartProperty>(
		prop: T,
		level: number = 1,
		percentage: boolean = false
	): string => {
		if (prop.BAddV) {
			return `Base ${prop.BAddV < 0 ? '' : '+'}${prop.BAddV * level * (percentage ? 100 : 1)}`;
		} else if (prop.AddP) {
			return `${prop.AddP < 0 ? '' : '+'}${prop.AddP * level * 100}%`;
		} else if (prop.AddV) {
			return `${prop.AddV < 0 ? '' : '+'}${prop.AddV * level * (percentage ? 100 : 1)}`;
		} else {
			return `No bonus detected, how did that happen?`;
		}
	};

	$: modifiers = modifierNames
		? modifierNames.map((name) => $modifierStore.map[name]).filter((v) => v)
		: undefined;
	$: regularProps = values(sumAndGroupProperties(properties ?? []));
	$: modifierProps = values(sumAndGroupProperties(modifiers?.flatMap((m) => m.Properties) ?? []));
</script>

{#each regularProps as prop}
	<p>
		{PropertyConfiguration[prop.Name].DisplayName ?? prop.Name}
		{propertyToString(prop, level, PropertyConfiguration[prop.Name].percentage ?? false)}
	</p>
{/each}
{#each modifierProps as prop}
	<p>{prop.DisplayName} {propertyToString(prop, level)}</p>
{/each}
