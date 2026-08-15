import type { SpeciesKeys } from '$lib/data/species';
import type {
	BodyLaw,
	BodyPart,
	EssenceName,
	LabelView,
	Modifier,
	PartProperty,
	SecretBody
} from '$lib/data/types';
import type { DataView } from '$lib/data/util/create-data-table';
import type { PropertyItem } from '$lib/util/total-property-item';
import type { GlobalBonusProp } from './defaults';

/** What `bodyPartsReader.read()` resolves to: a DataView plus the per-species name lists. */
export type BodyPartData = DataView<BodyPart> & { species: Record<SpeciesKeys, string[]> };

/** Every piece of static game data, loaded once and never mutated. */
export type GameData = {
	bodyLaws: DataView<BodyLaw>;
	bodyParts: BodyPartData;
	modifiers: DataView<Modifier>;
	secretBodies: DataView<SecretBody>;
	labels: DataView<LabelView>;
	essences: DataView<EssenceName>;
};

export type BodyOptions = {
	temperedHeart: boolean;
	temperedSpine: boolean;
	temperedBrain: boolean;
	fireSpine: boolean;
	illusionBrain: boolean;
	transcendantHeart: boolean;
	law: string;
	species: SpeciesKeys;
	name: string;
};

export type PartLabelCount = { Name: string; Level: number; MaxLevel: number };

/** Quenching labels the user picked, keyed by body part name. */
export type PartLabelCounts = Record<string, PartLabelCount[]>;

/** The same map with every label resolved to its full view. */
export type PartLabels = Record<string, LabelView[]>;

export type EquippedSecretBodies = {
	offensive: string[];
	defensive: string[];
	effective: string[];
};

export type Selection = { bodyPart?: string; secretBody?: string };

/** Everything the user picked. Small, serialisable, and the only mutable state. */
export type CultivatorState = {
	options: BodyOptions;
	partLabels: PartLabelCounts;
	equipped: EquippedSecretBodies;
	selected: Selection;
};

/** Everything derivable from `(GameData, CultivatorState)`. */
export type ComputedCultivator = {
	speciesParts: string[];
	partLabels: PartLabels;
	completeSecretBodies: Record<string, boolean>;
	partModifiers: Record<string, Modifier[]>;
	secretBodyModifiers: Modifier[];
	partProperties: Record<string, PartProperty[]>;
	secretBodyProperties: PartProperty[];
	selectedBodyPropertyGroups: Record<string, PartProperty>;
	globalPercentageBonus: Record<GlobalBonusProp, PropertyItem>;
	globalValueBonus: Record<GlobalBonusProp, PropertyItem>;
	qiRecovery: {
		globalRecovery: PropertyItem;
		equippedRecovery: PropertyItem;
		equippedCost: PropertyItem;
	};
};
