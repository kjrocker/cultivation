<script lang="ts">
	import type { Modifier, ModifierProperty } from '$lib/data/get-modifiers';
	import { undefinedSum } from '$lib/util/undefined-sum';
	import { concat, groupBy, mapObjIndexed, pipe } from 'ramda';
	import PropertyBonusListItem from './property-bonus-list-item.svelte';
	import { partModifierStore, secretBodyModifierStore } from './stores/current-modifiers-store';
	import { currentSecretBodyStore } from './stores/secret-bodies-store';

	const getAllModifierGroups = (
		bodyProps: Modifier[],
		partProps: Record<string, Modifier[]>
	): Record<string, ModifierProperty> => {
		const partProperties = Object.values(partProps).reduce(concat);
		const allProperties = [...partProperties, ...bodyProps]
			.filter((v) => v && v.Properties && Array.isArray(v.Properties))
			.flatMap((v) => v.Properties);
		return pipe(
			groupBy<ModifierProperty, string>((v) => v.Name),
			mapObjIndexed(
				(list: ModifierProperty[]): ModifierProperty =>
					list.reduce((acc, next) => {
						return {
							...acc,
							BAddV: undefinedSum(acc.BAddV, next.BAddV),
							AddP: undefinedSum(acc.AddP, next.AddP),
							AddV: undefinedSum(acc.AddV, next.AddV)
						};
					})
			)
		)(allProperties);
	};

	const MODIFIER_CONFIG = {
		BodyPractice_SuperPartAddp_CatchFabao: { percentage: true },
		BodyPractice_Other_TunaAddp: { percentage: true },
		BodyPractice_SuperPartAddp_AtkPower: { percentage: true },
		BodyPractice_SuperPartAddp_DefPower: { percentage: true },
		BodyPractice_SuperPartAddp_AtkRate: { percentage: true },
		BodyPractice_SuperPartAddp_DefRate: { percentage: true },
		BodyPractice_SuperPartAddp_ArmorPenetration: { percentage: true },
		NpcFight_BaseDodgeChance: { DisplayName: 'Dodge Chance', percentage: true },
		MaxAge: { DisplayName: 'Lifespan' },
		NeckCountdownAddV: { DisplayName: 'Cultivation Progress' },
		BodyPratice_QuenchingSpeed: { percentage: true }
	} as Record<string, Partial<{ DisplayName: string; percentage: boolean; rate: boolean }>>;

	$: groups = $currentSecretBodyStore
		? getAllModifierGroups($secretBodyModifierStore, $partModifierStore)
		: {};
</script>

<div class="border rounded-md my-2">
	{#each Object.keys(groups) as name}
		<PropertyBonusListItem
			{name}
			displayName={`${groups[name].DisplayName ?? MODIFIER_CONFIG[name]?.DisplayName ?? name}`}
			bonuses={groups[name]}
			percentage={!!MODIFIER_CONFIG[name]?.percentage}
			rate={!!MODIFIER_CONFIG[name]?.rate}
		/>
	{/each}
</div>
