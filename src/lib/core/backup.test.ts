import type { BodyLaw, BodyPart, LabelView, SecretBody } from '$lib/data/types';
import { createDataView } from '$lib/data/util/create-data-table';
import {
	captureState,
	expandEquippedBodies,
	expandOptions,
	expandPartLabels,
	restoreState,
	shrinkEquippedBodies,
	shrinkOptions,
	shrinkPartLabels,
	type MinifiedOptions,
	type MinifiedOptionsV1
} from './backup';
import { createDefaultState } from './defaults';
import type { BodyPartData, GameData } from './types';

const labels = [
	{ Name: 'Temper', MaxLevel: 100 },
	{ Name: 'Sharp', MaxLevel: 4 }
] as unknown as LabelView[];

const bodyParts = [{ Name: 'Heart' }, { Name: 'Spine' }] as unknown as BodyPart[];

const secretBodies = [
	{ Name: 'Body_A', Parts: [], Levels: [] },
	{ Name: 'Body_B', Parts: [], Levels: [] }
] as unknown as SecretBody[];

const bodyLaws = [
	{ Name: 'Body_Gong_1', SuperParts: [] },
	{ Name: 'Body_Gong_2', SuperParts: [] }
] as unknown as BodyLaw[];

const gameData: GameData = {
	labels: createDataView(labels, 'Name'),
	modifiers: createDataView([], 'Name'),
	secretBodies: createDataView(secretBodies, 'Name'),
	bodyLaws: createDataView(bodyLaws, 'Name'),
	bodyParts: {
		...createDataView(bodyParts, 'Name'),
		species: { human: ['Heart', 'Spine'], turtle: ['Spine'] }
	} as unknown as BodyPartData,
	essences: createDataView([], 'Name')
};

const options = { ...createDefaultState().options, name: 'Iron Turtle', law: 'Body_Gong_2' };

describe('shrink / expand round trips', () => {
	it('round-trips options through the law index', () => {
		const shrunk = shrinkOptions(gameData.bodyLaws, options);

		expect(shrunk.l).toBe(1);
		expect(shrunk.n).toBe('Iron Turtle');
		expect(expandOptions(gameData.bodyLaws, shrunk)).toEqual(options);
	});

	it('round-trips part labels through label and part indices', () => {
		const partLabels = { Heart: [{ Name: 'Sharp', Level: 4, MaxLevel: 4 }] };
		const shrunk = shrinkPartLabels(partLabels, gameData.labels, gameData.bodyParts);

		expect(shrunk).toEqual({ 0: [1] });
		expect(expandPartLabels(shrunk, gameData.labels, gameData.bodyParts)).toEqual(partLabels);
	});

	it('drops parts with no labels', () => {
		const shrunk = shrinkPartLabels(
			{ Heart: [], Spine: [{ Name: 'Temper', Level: 100, MaxLevel: 100 }] },
			gameData.labels,
			gameData.bodyParts
		);

		expect(shrunk).toEqual({ 1: [0] });
	});

	it('restores a label at its max level, discarding the saved one', () => {
		const expanded = expandPartLabels({ 0: [1] }, gameData.labels, gameData.bodyParts);

		expect(expanded.Heart).toEqual([{ Name: 'Sharp', Level: 4, MaxLevel: 4 }]);
	});

	it('round-trips equipped bodies', () => {
		const equipped = { offensive: ['Body_B'], defensive: [], effective: ['Body_A'] };
		const shrunk = shrinkEquippedBodies(equipped, gameData.secretBodies);

		expect(shrunk).toEqual({ o: [1], d: [], e: [0] });
		expect(expandEquippedBodies(shrunk, gameData.secretBodies)).toEqual(equipped);
	});

	it('encodes a name absent from the data as -1, which expands to undefined', () => {
		const shrunk = shrinkEquippedBodies(
			{ offensive: ['Body_Missing'], defensive: [], effective: [] },
			gameData.secretBodies
		);

		expect(shrunk.o).toEqual([-1]);
		expect(expandEquippedBodies(shrunk, gameData.secretBodies).offensive).toEqual([undefined]);
	});
});

describe('captureState / restoreState', () => {
	const state = {
		...createDefaultState(),
		options,
		partLabels: { Heart: [{ Name: 'Sharp', Level: 4, MaxLevel: 4 }], Spine: [] },
		equipped: { offensive: ['Body_A'], defensive: [], effective: [] },
		selected: { bodyPart: 'Heart', secretBody: 'Body_A' }
	};

	it('round-trips a whole cultivator', () => {
		const restored = restoreState(gameData, captureState(gameData, state));

		expect(restored.options).toEqual(state.options);
		expect(restored.partLabels).toEqual(state.partLabels);
		expect(restored.equipped).toEqual(state.equipped);
	});

	it('starts from a cleared selection', () => {
		const restored = restoreState(gameData, captureState(gameData, state));

		expect(restored.selected).toEqual({ bodyPart: undefined, secretBody: undefined });
	});

	it('seeds every part of the restored species, then overlays the saved labels', () => {
		const turtle = { ...state, options: { ...options, species: 'turtle' as const } };
		const restored = restoreState(gameData, captureState(gameData, turtle));

		// Spine is seeded from the turtle part list; Heart only survives because the
		// blob carried labels for it.
		expect(restored.partLabels).toEqual({
			Spine: [],
			Heart: [{ Name: 'Sharp', Level: 4, MaxLevel: 4 }]
		});
	});

	it('normalizes temperings the restored law does not allow', () => {
		const restored = restoreState(
			gameData,
			captureState(gameData, {
				...state,
				options: { ...options, law: 'Body_Gong_1', fireSpine: true }
			})
		);

		expect(restored.options.fireSpine).toBe(false);
	});

	it('reads a version 1 blob, whose labels carry their own level', () => {
		const v1: MinifiedOptionsV1 = {
			options: { ...options, species: 'human' },
			labels: { Heart: [['Sharp', 2]] }
		};
		const restored = restoreState(gameData, v1);

		expect(restored.options.name).toBe('Iron Turtle');
		expect(restored.partLabels).toEqual({
			Heart: [{ Name: 'Sharp', Level: 2, MaxLevel: 2 }],
			Spine: []
		});
		expect(restored.equipped).toEqual({ offensive: [], defensive: [], effective: [] });
	});

	it('rejects a version it does not know how to read', () => {
		expect(() => restoreState(gameData, { v: 3 } as unknown as MinifiedOptions)).toThrow(
			/version: 3/
		);
	});
});
