export type PropertyConfig = {
	DisplayName: string;
	percentage: boolean;
	rate: boolean;
	max: number;
	min: number;
	initial: number;
};

export const SecretBodyProperties = [
	'AtkPower',
	'DefPower',
	'AtkRate',
	'DefRate',
	'ArmorPenetration',
	'CatchFabao',
	'FightCost',
	'RecoverQi',
	'ResistanceJin',
	'ResistanceTu',
	'ResistanceShui',
	'ResistanceMu',
	'ResistanceHuo'
] as const;

export const PropertyBlacklist: Record<
	string,
	Partial<{ BAddV: boolean; AddP: boolean; AddV: true }>
> = {
	RecoverQi: { AddP: true }
};

export const PropertyConfiguration = {
	AtkPower: { DisplayName: 'Attack' },
	DefPower: { DisplayName: 'Defense' },
	AtkRate: { DisplayName: 'Atk. Rate', percentage: true, max: 0.95 },
	DefRate: { DisplayName: 'Def. Rate', percentage: true, max: 0.95 },
	ArmorPenetration: { DisplayName: 'Armor Penetration', percentage: true, max: 0.25 },
	CatchFabao: { DisplayName: 'Artifact Suppression', percentage: true },
	FightCost: { DisplayName: 'Qi Cost', rate: true },
	RecoverQi: { DisplayName: 'Qi Recovery', rate: true },
	ResistanceJin: { DisplayName: 'Metal Resist', percentage: true },
	ResistanceTu: { DisplayName: 'Earth Resist', percentage: true },
	ResistanceShui: { DisplayName: 'Water Resist', percentage: true },
	ResistanceMu: { DisplayName: 'Wood Resist', percentage: true },
	ResistanceHuo: { DisplayName: 'Fire Resist', percentage: true },
	BodyPractice_SuperPartAddp_CatchFabao: { percentage: true },
	BodyPractice_SuperPartAddv_CatchFabao: { percentage: true },
	BodyPractice_Other_TunaAddp: { percentage: true },
	BodyPractice_SuperPartAddp_AtkPower: { percentage: true },
	BodyPractice_SuperPartAddp_DefPower: { percentage: true },
	BodyPractice_SuperPartAddp_AtkRate: { percentage: true },
	BodyPractice_SuperPartAddp_DefRate: { percentage: true },
	BodyPractice_SuperPartAddv_AtkRate: { percentage: true },
	BodyPractice_SuperPartAddv_DefRate: { percentage: true },
	BodyPractice_SuperPartAddp_ArmorPenetration: { percentage: true },
	NpcFight_BaseDodgeChance: { percentage: true, max: 0.95 },
	BodyPratice_QuenchingSpeed: { percentage: true },
	BodyPratice_BodyRecover: { percentage: true },
	BodyPractice_EatItemProduceRateAddp: { percentage: true },
	BodyPractice_EatItemProduceCountAddp: { percentage: true },
	BodyPractice_AngerFireEffectAddp: { percentage: true },
	NutritionToJingYuanK: { rate: true },
	NutritionConsumeConstant: { percentage: true }
} as Record<string, Partial<PropertyConfig>>;
