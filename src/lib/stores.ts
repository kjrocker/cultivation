import { restoreState, type MinifiedOptions } from '$lib/core/backup';
import { computeCultivator } from '$lib/core/compute';
import { createDefaultState } from '$lib/core/defaults';
import * as select from '$lib/core/select';
import * as transitions from '$lib/core/state';
import type {
	BodyOptions,
	ComputedCultivator,
	CultivatorState,
	EquippedSecretBodies,
	GameData,
	PartLabelCounts
} from '$lib/core/types';
import type { BodyLaw, LabelView } from '$lib/data/types';
import { bodyLawReader } from '$lib/data/xml/get-body-laws';
import { bodyPartsReader } from '$lib/data/xml/get-body-parts';
import { essenceReader } from '$lib/data/xml/get-essence-names';
import { labelReader } from '$lib/data/xml/get-labels';
import { modifierReader } from '$lib/data/xml/get-modifiers';
import { secretBodyReader } from '$lib/data/xml/get-secret-bodies';
import { derived, writable, type Readable } from 'svelte/store';

/**
 * The whole reactive surface of the app. Everything below is either a `writable`
 * holding plain data or a `derived` slice of `computeCultivator`; all the logic
 * lives in `$lib/core`.
 */

/** Null until `loadGameData()` resolves. `+layout.svelte` renders nothing until then. */
export const gameData = writable<GameData>(null as unknown as GameData);

export const cultivator = writable<CultivatorState>(createDefaultState());

export const computed = derived([gameData, cultivator], ([$data, $state]) =>
	$data ? computeCultivator($data, $state) : null
);

export const loadGameData = async (): Promise<GameData> => {
	const [bodyParts, secretBodies, bodyLaws, labels, modifiers, essences] = await Promise.all([
		bodyPartsReader.read(),
		secretBodyReader.read(),
		bodyLawReader.read(),
		labelReader.read(),
		modifierReader.read(),
		essenceReader.read()
	]);
	const data: GameData = { bodyParts, secretBodies, bodyLaws, labels, modifiers, essences };
	gameData.set(data);
	return data;
};

/** Every mutation in the app goes through one of these. */
export const actions = {
	setOptions: (options: BodyOptions) =>
		cultivator.update((s) => transitions.setOptions(s, options)),
	setParts: (names: string[]) => cultivator.update((s) => transitions.setParts(s, names)),
	initParts: (names: string[]) => cultivator.update((s) => transitions.initParts(s, names)),
	setPartLabels: (name: string, labels: LabelView[]) =>
		cultivator.update((s) => transitions.setPartLabels(s, name, labels)),
	appendPartLabels: (name: string, labels: LabelView[]) =>
		cultivator.update((s) => transitions.appendPartLabels(s, name, labels)),
	mergePartLabels: (counts: PartLabelCounts) =>
		cultivator.update((s) => transitions.mergePartLabels(s, counts)),
	equipBody: (type: keyof EquippedSecretBodies, name: string) =>
		cultivator.update((s) => transitions.equipBody(s, type, name)),
	unequipBody: (type: keyof EquippedSecretBodies, name: string) =>
		cultivator.update((s) => transitions.unequipBody(s, type, name)),
	selectBodyPart: (name?: string) => cultivator.update((s) => transitions.selectBodyPart(s, name)),
	toggleSecretBody: (name: string) =>
		cultivator.update((s) => transitions.toggleSecretBody(s, name)),
	clearSelection: () => cultivator.update(transitions.clearSelection),
	restore: (data: GameData, build: MinifiedOptions) => cultivator.set(restoreState(data, build))
};

/**
 * Slices of the two stores above, named as the old store modules were so components
 * read them with a plain `$store`. Nothing subscribes before `loadGameData()` resolves,
 * so these are typed as if the data were always there.
 */
const view = <T>(pick: (c: ComputedCultivator) => T): Readable<T> =>
	derived(computed, (c) => (c ? pick(c) : (undefined as unknown as T)));

const data = <T>(pick: (d: GameData) => T): Readable<T> =>
	derived(gameData, (d) => (d ? pick(d) : (undefined as unknown as T)));

export const bodyLawStore = data((d) => d.bodyLaws);
export const bodyPartsStore = data((d) => d.bodyParts);
export const labelStore = data((d) => d.labels);
export const modifierStore = data((d) => d.modifiers);
export const secretBodyStore = data((d) => d.secretBodies);
export const essenceStore = data((d) => d.essences);

export const currentSpeciesPartsStore = view((c) => c.speciesParts);
export const partLabelStore = view((c) => c.partLabels);
export const completeSecretBodiesStore = view((c) => c.completeSecretBodies);
export const partModifierStore = view((c) => c.partModifiers);
export const secretBodyModifierStore = view((c) => c.secretBodyModifiers);
export const selectedBodyPropertyGroupsStore = view((c) => c.selectedBodyPropertyGroups);
export const globalPercentageBonusStore = view((c) => c.globalPercentageBonus);
export const globalValueBonusStore = view((c) => c.globalValueBonus);
export const qiRecoveryStore = view((c) => c.qiRecovery);

export const selectedStore = derived(cultivator, (s) => s.selected);
export const equippedSecretBodyStore = derived(cultivator, (s) => s.equipped);

export const selectedLawStore = derived([gameData, cultivator], ([$data, $state]) =>
	$data ? select.selectLaw($data, $state) : (undefined as unknown as BodyLaw)
);

export const selectedBodyPart = derived([gameData, cultivator], ([$data, $state]) =>
	$data ? select.selectBodyPart($data, $state) : undefined
);

export const selectedSecretBody = derived([gameData, cultivator], ([$data, $state]) =>
	$data ? select.selectSecretBody($data, $state) : undefined
);

/**
 * Writable so `options-form.svelte` can keep its `bind:`s. Each emission is a fresh
 * copy, so a binding writing through mutates the copy and never the live state.
 */
const optionsView = derived(cultivator, (s) => ({ ...s.options }));

export const bodyOptionsStore = {
	subscribe: optionsView.subscribe,
	set: actions.setOptions,
	update: (fn: (options: BodyOptions) => BodyOptions) =>
		cultivator.update((s) => transitions.setOptions(s, fn({ ...s.options })))
};
