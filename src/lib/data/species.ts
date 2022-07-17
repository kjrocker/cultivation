import type { LanguageEnum } from 'src/types/language';
import type { SettingsEnum } from 'src/types/settings';

type SpeciesConfig = {
	name: string;
	setting: SettingsEnum;
	language: LanguageEnum;
	excludeNames?: string[];
};

export type SpeciesKeys =
	| 'human'
	| 'snake'
	| 'boar'
	| 'panda'
	| 'bull'
	| 'tiger'
	| 'cat'
	| 'wolf'
	| 'chicken'
	| 'frog'
	| 'bear'
	| 'rabbit'
	| 'turtle';

const DEFAULT_EXCLUDE_NAMES = ['Head', 'Body'];

export const SPECIES_CONFIG: Record<SpeciesKeys, SpeciesConfig> = {
	human: {
		name: 'Human',
		setting: 'Npc/Body/Human',
		language: 'Npc/Body/Human',
		excludeNames: ['HumanBody', ...DEFAULT_EXCLUDE_NAMES]
	},
	snake: {
		name: 'Snake',
		setting: 'Npc/Body/YGAnimal_Snake',
		language: 'Npc/Body/YGAnimal_Snake',
		excludeNames: ['YGAnimal_SnakeBody', ...DEFAULT_EXCLUDE_NAMES]
	},
	boar: {
		name: 'Boar',
		setting: 'Npc/Body/YGAnimal_Boar',
		language: 'Npc/Body/YGAnimal_Boar',
		excludeNames: ['YGAnimal_BoarBody', ...DEFAULT_EXCLUDE_NAMES]
	},
	panda: {
		name: 'Panda',
		setting: 'Npc/Body/YGAnimal_Panda',
		language: 'Npc/Body/YGAnimal_Panda',
		excludeNames: ['YGAnimal_PandaBody', ...DEFAULT_EXCLUDE_NAMES]
	},
	bull: {
		name: 'Bull',
		setting: 'Npc/Body/YGAnimal_Cattle',
		language: 'Npc/Body/YGAnimal_Cattle',
		excludeNames: ['YGAnimal_CattleBody', ...DEFAULT_EXCLUDE_NAMES]
	},
	tiger: {
		name: 'Tiger',
		setting: 'Npc/Body/YGAnimal_CatTigerWolf',
		language: 'Npc/Body/YGAnimal_CatTigerWolf',
		excludeNames: ['YGAnimal_CTWBody', ...DEFAULT_EXCLUDE_NAMES]
	},
	cat: {
		name: 'Cat',
		setting: 'Npc/Body/YGAnimal_CatTigerWolf',
		language: 'Npc/Body/YGAnimal_CatTigerWolf',
		excludeNames: ['YGAnimal_CTWBody', ...DEFAULT_EXCLUDE_NAMES]
	},
	wolf: {
		name: 'Wolf',
		setting: 'Npc/Body/YGAnimal_CatTigerWolf',
		language: 'Npc/Body/YGAnimal_CatTigerWolf',
		excludeNames: ['YGAnimal_CTWBody', ...DEFAULT_EXCLUDE_NAMES]
	},
	chicken: {
		name: 'Chicken',
		setting: 'Npc/Body/YGAnimal_Chicken',
		language: 'Npc/Body/YGAnimal_Chicken',
		excludeNames: ['YGAnimal_ChickenBody', ...DEFAULT_EXCLUDE_NAMES]
	},
	frog: {
		name: 'Frog',
		setting: 'Npc/Body/YGAnimal_Frog',
		language: 'Npc/Body/YGAnimal_Frog',
		excludeNames: ['YGAnimal_FrogBody', ...DEFAULT_EXCLUDE_NAMES]
	},
	bear: {
		name: 'Bear',
		setting: 'Npc/Body/YGAnimal_Bear',
		language: 'Npc/Body/YGAnimal_Bear',
		excludeNames: ['YGAnimal_BearBody', ...DEFAULT_EXCLUDE_NAMES]
	},
	rabbit: {
		name: 'Rabbit',
		setting: 'Npc/Body/YGAnimal_Rabbit',
		language: 'Npc/Body/YGAnimal_Rabbit',
		excludeNames: ['YGAnimal_RabbitBody', ...DEFAULT_EXCLUDE_NAMES]
	},
	turtle: {
		name: 'Turtle',
		setting: 'Npc/Body/YGAnimal_Turtle',
		language: 'Npc/Body/YGAnimal_Turtle',
		excludeNames: ['YGAnimal_TurtleBody', ...DEFAULT_EXCLUDE_NAMES]
	}
};
