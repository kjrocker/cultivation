import type { BodyLaw, BodyPart, LabelView, Modifier, SecretBody } from '$lib/data/types';
import { createDataView } from '$lib/data/util/create-data-table';
import { computeCultivator, scaleProperties } from './compute';
import { createDefaultState } from './defaults';
import type { BodyPartData, CultivatorState, GameData } from './types';

const labels = [
	{
		Name: 'Temper',
		MaxLevel: 100,
		Modifier: [],
		SuperPartProperties: [{ Name: 'AtkPower', BAddV: 10 }]
	},
	{
		Name: 'Sharp',
		MaxLevel: 4,
		Modifier: ['Mod_Atk'],
		SuperPartProperties: [{ Name: 'AtkPower', AddV: 2 }]
	},
	{
		Name: 'Qi',
		MaxLevel: 2,
		Modifier: ['Mod_Qi'],
		SuperPartProperties: [{ Name: 'RecoverQi', BAddV: 3 }]
	}
] as unknown as LabelView[];

const modifiers = [
	{ Name: 'Mod_Atk', Properties: [{ Name: 'BodyPractice_SuperPartAddp_AtkPower', AddV: 3 }] },
	{ Name: 'Mod_Qi', Properties: [{ Name: 'BodyPratice_RecoverZhenQi', BAddV: 2 }] },
	{ Name: 'Mod_Body', Properties: [{ Name: 'BodyPractice_SuperPartAddv_DefPower', AddV: 5 }] }
] as unknown as Modifier[];

const secretBodies = [
	{
		Name: 'Body_A',
		Parts: [{ Name: 'Heart', Labels: [{ Name: 'Sharp', Levels: [4] }] }],
		Levels: [
			{ Modifier: '', SuperPartProperties: [] },
			{ Modifier: 'Mod_Body', SuperPartProperties: [{ Name: 'FightCost', BAddV: 7 }] }
		]
	},
	{
		Name: 'Body_B',
		Parts: [{ Name: 'Spine', Labels: [{ Name: 'Qi', Levels: [2] }] }],
		Levels: [{ Modifier: 'Mod_Body', SuperPartProperties: [] }]
	}
] as unknown as SecretBody[];

const bodyLaws = [
	{ Name: 'Body_Gong_1', SuperParts: ['Body_A'] },
	{ Name: 'Body_Gong_2', SuperParts: ['Body_A', 'Body_B'] }
] as unknown as BodyLaw[];

const bodyParts = [
	{ Name: 'Heart', Kind: 'Flesh' },
	{ Name: 'Spine', Kind: 'Bone' }
] as unknown as BodyPart[];

const gameData: GameData = {
	labels: createDataView(labels, 'Name'),
	modifiers: createDataView(modifiers, 'Name'),
	secretBodies: createDataView(secretBodies, 'Name'),
	bodyLaws: createDataView(bodyLaws, 'Name'),
	bodyParts: {
		...createDataView(bodyParts, 'Name'),
		species: { human: ['Heart', 'Spine'], turtle: ['Spine'] }
	} as unknown as BodyPartData,
	essences: createDataView([], 'Name')
};

const count = (Name: string, Level: number) => ({ Name, Level, MaxLevel: Level });

const stateWith = (overrides: Partial<CultivatorState> = {}): CultivatorState => ({
	...createDefaultState(),
	...overrides
});

describe('scaleProperties', () => {
	it('multiplies every additive field by the level', () => {
		expect(scaleProperties([{ Name: 'AtkPower', AddV: 2, AddP: 1, BAddV: 3 }], 4)).toEqual([
			{ Name: 'AtkPower', AddV: 8, AddP: 4, BAddV: 12 }
		]);
	});

	it('fills missing fields with zero and tolerates no properties at all', () => {
		expect(scaleProperties([{ Name: 'AtkPower', AddV: 1 }], 2)).toEqual([
			{ Name: 'AtkPower', AddV: 2, AddP: 0, BAddV: 0 }
		]);
		expect(scaleProperties(undefined, 2)).toEqual([]);
	});

	it('preserves the fields a modifier property carries along', () => {
		expect(scaleProperties([{ Name: 'X', DisplayName: 'Ex', AddV: 1 }], 3)[0]).toMatchObject({
			DisplayName: 'Ex'
		});
	});
});

describe('computeCultivator', () => {
	it('resolves the species part list and the label views', () => {
		const computed = computeCultivator(
			gameData,
			stateWith({ partLabels: { Heart: [count('Temper', 100)] } })
		);

		expect(computed.speciesParts).toEqual(['Heart', 'Spine']);
		expect(computed.partLabels.Heart).toEqual([gameData.labels.map['Temper']]);
	});

	it('scales part properties and modifier properties by the label level', () => {
		const computed = computeCultivator(
			gameData,
			stateWith({ partLabels: { Heart: [count('Sharp', 4)] } })
		);

		expect(computed.partProperties.Heart).toEqual([
			{ Name: 'AtkPower', AddV: 8, AddP: 0, BAddV: 0 }
		]);
		expect(computed.partModifiers.Heart).toEqual([
			{
				Name: 'Mod_Atk',
				Properties: [{ Name: 'BodyPractice_SuperPartAddp_AtkPower', AddV: 12, AddP: 0, BAddV: 0 }]
			}
		]);
	});

	it('maps a label with no modifiers to no modifiers', () => {
		const computed = computeCultivator(
			gameData,
			stateWith({ partLabels: { Heart: [count('Temper', 100)] } })
		);

		expect(computed.partModifiers.Heart).toEqual([]);
	});

	it('marks a secret body complete only when every required label is present', () => {
		const incomplete = computeCultivator(gameData, stateWith({ partLabels: { Heart: [] } }));
		expect(incomplete.completeSecretBodies).toEqual({ Body_A: false, Body_B: false });

		const complete = computeCultivator(
			gameData,
			stateWith({ partLabels: { Heart: [count('Sharp', 4)] } })
		);
		expect(complete.completeSecretBodies).toEqual({ Body_A: true, Body_B: false });
	});

	it('does not complete a body the current law does not offer', () => {
		const computed = computeCultivator(
			gameData,
			stateWith({ partLabels: { Spine: [count('Qi', 2)] } })
		);

		expect(computed.completeSecretBodies.Body_B).toBe(false);
		expect(
			computeCultivator(
				gameData,
				stateWith({
					options: { ...createDefaultState().options, law: 'Body_Gong_2' },
					partLabels: { Spine: [count('Qi', 2)] }
				})
			).completeSecretBodies.Body_B
		).toBe(true);
	});

	it('takes the last level modifier of every completed body', () => {
		const computed = computeCultivator(
			gameData,
			stateWith({ partLabels: { Heart: [count('Sharp', 4)] } })
		);

		expect(computed.secretBodyModifiers).toEqual([gameData.modifiers.map['Mod_Body']]);
	});

	it('derives both global bonus tables from the same modifier pass', () => {
		const computed = computeCultivator(
			gameData,
			stateWith({ partLabels: { Heart: [count('Sharp', 4)] } })
		);

		// Mod_Atk contributes 3 * level 4 to the percentage table...
		expect(computed.globalPercentageBonus.AtkPower.total).toBe(12);
		// ...and the completed body's Mod_Body contributes 5 to the value table.
		expect(computed.globalValueBonus.DefPower.total).toBe(5);
		expect(Object.keys(computed.globalPercentageBonus)).toEqual([
			'AtkPower',
			'DefPower',
			'AtkRate',
			'DefRate',
			'CatchFabao',
			'ArmorPenetration'
		]);
		expect(computed.globalValueBonus.AtkPower.total).toBe(0);
	});

	it('balances qi recovery over the equipped bodies', () => {
		const computed = computeCultivator(
			gameData,
			stateWith({
				partLabels: { Heart: [count('Sharp', 4), count('Qi', 2)] },
				equipped: { offensive: ['Body_A'], defensive: [], effective: [] }
			})
		);

		// Mod_Qi's base 2, scaled by the label level of 2.
		expect(computed.qiRecovery.globalRecovery.total).toBe(4);
		// The Qi label on Heart, a part of the equipped Body_A: base 3 scaled by 2.
		expect(computed.qiRecovery.equippedRecovery.total).toBe(6);
		// Body_A's own last-level property.
		expect(computed.qiRecovery.equippedCost.total).toBe(7);
	});

	it('reports no qi flow when nothing is equipped', () => {
		const computed = computeCultivator(gameData, stateWith());

		expect(computed.qiRecovery.equippedRecovery.total).toBe(0);
		expect(computed.qiRecovery.equippedCost.total).toBe(0);
	});

	it('groups the selected body properties only once it is complete', () => {
		const incomplete = computeCultivator(
			gameData,
			stateWith({ partLabels: { Heart: [] }, selected: { secretBody: 'Body_A' } })
		);

		expect(incomplete.selectedBodyPropertyGroups).toEqual({});
		// Not complete yet, so the body still advertises its own final-level properties.
		expect(incomplete.secretBodyProperties).toEqual([{ Name: 'FightCost', BAddV: 7 }]);

		const complete = computeCultivator(
			gameData,
			stateWith({
				partLabels: { Heart: [count('Sharp', 4)] },
				selected: { secretBody: 'Body_A' }
			})
		);

		expect(complete.selectedBodyPropertyGroups).toEqual({
			AtkPower: { Name: 'AtkPower', AddV: 8, AddP: 0, BAddV: 0 },
			FightCost: { Name: 'FightCost', AddV: 0, AddP: 0, BAddV: 7 }
		});
		expect(complete.secretBodyProperties).toEqual([]);
	});

	it('computes cleanly for an untouched cultivator', () => {
		const computed = computeCultivator(gameData, stateWith());

		expect(computed.partLabels).toEqual({});
		expect(computed.secretBodyModifiers).toEqual([]);
		expect(computed.selectedBodyPropertyGroups).toEqual({});
	});
});
