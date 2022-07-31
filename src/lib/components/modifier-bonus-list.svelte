<script lang="ts">
	import { getAllModifierGroups } from '$lib/util/get-all-modifier-groups';
	import PropertyBonusListItem from './property-bonus-list-item.svelte';
	import { partModifierStore, secretBodyModifierStore } from './stores/current-modifiers-store';

	const MODIFIER_CONFIG = {
		BodyPractice_SuperPartAddp_CatchFabao: { percentage: true },
		BodyPractice_Other_TunaAddp: { percentage: true },
		BodyPractice_SuperPartAddp_AtkPower: { percentage: true },
		BodyPractice_SuperPartAddp_DefPower: { percentage: true },
		BodyPractice_SuperPartAddp_AtkRate: { percentage: true },
		BodyPractice_SuperPartAddp_DefRate: { percentage: true },
		BodyPractice_SuperPartAddp_ArmorPenetration: { percentage: true },
		NpcFight_BaseDodgeChance: { percentage: true },
		BodyPratice_QuenchingSpeed: { percentage: true }
	} as Record<string, Partial<{ DisplayName: string; percentage: boolean; rate: boolean }>>;

	$: groups = getAllModifierGroups($secretBodyModifierStore, $partModifierStore);
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
