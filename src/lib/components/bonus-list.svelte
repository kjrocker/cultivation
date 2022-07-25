<script lang="ts">
	import type { LabelView, PartProperty } from '$lib/data/get-labels';
	import { last, toPairs } from 'ramda';
	import { partLabelStore } from './part-label-store';
	import { currentSecretBodyStore } from './secret-bodies-store';

	const getPropertyPair = (p: PartProperty): ['AddV' | 'AddP' | 'BAddV', string] =>
		toPairs(p).find((v) => v[0] !== 'Name') as unknown as ['AddV' | 'AddP' | 'BAddV', string];

	$: bodyProperties = last($currentSecretBodyStore?.Levels ?? [])?.SuperPartProperties ?? [];

	$: bodyModifier = last($currentSecretBodyStore?.Levels ?? [])?.Modifier;

	$: partProperties = ($currentSecretBodyStore?.Parts.map((part) =>
		$partLabelStore[part.Name]?.map((label) => label.SuperPartProperties)
	).flat(2) ?? []) as (PartProperty & LabelView)[];

	$: partModifiers = $currentSecretBodyStore?.Parts.map((part) => $partLabelStore[part.Name])
		.flat(2)
		.filter((v: LabelView) => v && v.Modifier) as LabelView[];

	$: allProperties = [...partProperties, ...bodyProperties];

	$: allModifiers = [...(partModifiers.map((v) => v.Modifier) ?? []), bodyModifier].filter(
		(v) => v
	);

	$: {
		console.log('Secret Body: ', $currentSecretBodyStore);
	}
</script>

<div class="w-1/4">
	Properties
	{#each allProperties as property}
		<p>{property.Name} - {getPropertyPair(property)}</p>
	{/each}
	Modifiers
	{#each allModifiers as modifier}
		<p>{modifier}</p>
	{/each}
</div>
