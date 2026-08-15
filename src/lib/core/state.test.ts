import type { LabelView } from '$lib/data/types';
import { createDefaultState } from './defaults';
import {
	appendPartLabels,
	clearSelection,
	equipBody,
	initParts,
	mergePartLabels,
	normalizeOptions,
	selectBodyPart,
	setOptions,
	setPartLabels,
	setParts,
	toggleSecretBody,
	unequipBody
} from './state';
import type { CultivatorState } from './types';

const label = (Name: string, MaxLevel = 1): LabelView => ({ Name, MaxLevel } as LabelView);

const stateWith = (overrides: Partial<CultivatorState> = {}): CultivatorState => ({
	...createDefaultState(),
	...overrides
});

/** Every transition has to leave its input untouched — see the aliasing bugs in the old stores. */
const expectPure = (before: CultivatorState, run: (s: CultivatorState) => CultivatorState) => {
	const snapshot = JSON.parse(JSON.stringify(before));
	const after = run(before);
	expect(before).toEqual(snapshot);
	return after;
};

describe('part label transitions', () => {
	it('setParts prunes removed parts and preserves surviving ones', () => {
		const before = stateWith({
			partLabels: { Heart: [{ Name: 'a', Level: 1, MaxLevel: 1 }], Spine: [] }
		});
		const after = expectPure(before, (s) => setParts(s, ['Heart', 'Brain']));

		expect(after.partLabels).toEqual({
			Heart: [{ Name: 'a', Level: 1, MaxLevel: 1 }],
			Brain: []
		});
		expect(after).not.toBe(before);
		expect(after.partLabels).not.toBe(before.partLabels);
	});

	it('initParts wipes everything and seeds each part empty', () => {
		const before = stateWith({
			partLabels: { Heart: [{ Name: 'a', Level: 1, MaxLevel: 1 }] }
		});
		const after = expectPure(before, (s) => initParts(s, ['Heart', 'Brain']));

		expect(after.partLabels).toEqual({ Heart: [], Brain: [] });
	});

	it('setPartLabels replaces a part and records labels at max level', () => {
		const before = stateWith({ partLabels: { Heart: [{ Name: 'old', Level: 1, MaxLevel: 1 }] } });
		const after = expectPure(before, (s) => setPartLabels(s, 'Heart', [label('new', 4)]));

		expect(after.partLabels.Heart).toEqual([{ Name: 'new', Level: 4, MaxLevel: 4 }]);
	});

	it('appendPartLabels dedupes by Name, keeping the existing entry', () => {
		const before = stateWith({ partLabels: { Heart: [{ Name: 'a', Level: 2, MaxLevel: 9 }] } });
		const after = expectPure(before, (s) =>
			appendPartLabels(s, 'Heart', [label('a', 9), label('b', 4)])
		);

		expect(after.partLabels.Heart).toEqual([
			{ Name: 'a', Level: 2, MaxLevel: 9 },
			{ Name: 'b', Level: 4, MaxLevel: 4 }
		]);
	});

	it('appendPartLabels works on a part that has no labels yet', () => {
		const after = appendPartLabels(stateWith(), 'Heart', [label('a')]);
		expect(after.partLabels.Heart).toEqual([{ Name: 'a', Level: 1, MaxLevel: 1 }]);
	});

	it('mergePartLabels overlays whole parts', () => {
		const before = stateWith({ partLabels: { Heart: [], Spine: [] } });
		const after = expectPure(before, (s) =>
			mergePartLabels(s, { Spine: [{ Name: 'a', Level: 1, MaxLevel: 1 }] })
		);

		expect(after.partLabels).toEqual({ Heart: [], Spine: [{ Name: 'a', Level: 1, MaxLevel: 1 }] });
	});
});

describe('equipped secret bodies', () => {
	it('equipBody is idempotent', () => {
		const once = equipBody(stateWith(), 'offensive', 'Body_A');
		const twice = equipBody(once, 'offensive', 'Body_A');

		expect(once.equipped.offensive).toEqual(['Body_A']);
		expect(twice.equipped).toEqual(once.equipped);
	});

	it('equipBody does not leak into the default state', () => {
		equipBody(stateWith(), 'offensive', 'Body_A');
		expect(createDefaultState().equipped).toEqual({
			offensive: [],
			defensive: [],
			effective: []
		});
	});

	it('equipBody leaves its input untouched', () => {
		const before = stateWith();
		const after = expectPure(before, (s) => equipBody(s, 'defensive', 'Body_A'));

		expect(before.equipped.defensive).toEqual([]);
		expect(after.equipped.defensive).toEqual(['Body_A']);
	});

	it('unequipBody removes only the named body', () => {
		const before = stateWith({
			equipped: { offensive: ['Body_A', 'Body_B'], defensive: [], effective: [] }
		});
		const after = expectPure(before, (s) => unequipBody(s, 'offensive', 'Body_A'));

		expect(after.equipped.offensive).toEqual(['Body_B']);
	});
});

describe('selection', () => {
	it('selectBodyPart keeps the selected secret body', () => {
		const before = stateWith({ selected: { bodyPart: 'Heart', secretBody: 'Body_A' } });
		const after = expectPure(before, (s) => selectBodyPart(s, 'Spine'));

		expect(after.selected).toEqual({ bodyPart: 'Spine', secretBody: 'Body_A' });
	});

	it('toggleSecretBody toggles off on repeat', () => {
		const on = toggleSecretBody(stateWith(), 'Body_A');
		const off = toggleSecretBody(on, 'Body_A');
		const other = toggleSecretBody(on, 'Body_B');

		expect(on.selected.secretBody).toBe('Body_A');
		expect(off.selected.secretBody).toBeUndefined();
		expect(other.selected.secretBody).toBe('Body_B');
	});

	it('clearSelection drops both selections', () => {
		const before = stateWith({ selected: { bodyPart: 'Heart', secretBody: 'Body_A' } });
		const after = expectPure(before, clearSelection);

		expect(after.selected).toEqual({ bodyPart: undefined, secretBody: undefined });
	});
});

describe('normalizeOptions', () => {
	const allFlags = {
		fireSpine: true,
		illusionBrain: true,
		transcendantHeart: true
	};

	it.each([
		['Body_Gong_1', { fireSpine: false, illusionBrain: false, transcendantHeart: false }],
		['Body_Gong_2', { fireSpine: true, illusionBrain: false, transcendantHeart: false }],
		['Body_Gong_3', { fireSpine: false, illusionBrain: true, transcendantHeart: false }],
		['Body_Gong_5', { fireSpine: false, illusionBrain: false, transcendantHeart: true }]
	])('%s allows exactly its own tempering', (law, expected) => {
		const options = { ...createDefaultState().options, ...allFlags, law };
		expect(normalizeOptions(options)).toMatchObject(expected);
	});

	it('leaves the other options alone', () => {
		const options = { ...createDefaultState().options, name: 'Iron Turtle', law: 'Body_Gong_2' };
		const normalized = normalizeOptions(options);

		expect(normalized.name).toBe('Iron Turtle');
		expect(normalized.temperedHeart).toBe(true);
		expect(normalized).not.toBe(options);
	});

	it('clears every extra tempering for an unknown law', () => {
		const options = { ...createDefaultState().options, ...allFlags, law: 'Body_Gong_99' };
		expect(normalizeOptions(options)).toMatchObject({
			fireSpine: false,
			illusionBrain: false,
			transcendantHeart: false
		});
	});

	it('setOptions normalizes on the way in', () => {
		const before = stateWith();
		const after = expectPure(before, (s) =>
			setOptions(s, { ...s.options, ...allFlags, law: 'Body_Gong_3' })
		);

		expect(after.options).toMatchObject({
			fireSpine: false,
			illusionBrain: true,
			transcendantHeart: false
		});
	});
});
