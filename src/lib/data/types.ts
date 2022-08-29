export type BodyLaw = {
	Name: string;
	DisplayName: string;
	Desc: string;
	SuperParts: string[];
	QuenchingMethods: string[];
};

export type EssenceName = { Name: string; ThingName: string; Desc: string };

export type BodyPart = {
	Name: string;
	DisplayName: string;
	Kind: 'Flesh' | 'Bone' | 'Organ';
	PartGroup: string;
	ParentName: string;
	ParentDisplayName: string;
	BPQLabelBaseCache?: string;
};

export type PartProperty = { Name: string; AddP?: number; AddV?: number; BAddV?: number };

export type SecretBody = {
	Name: string;
	DisplayName: string;
	Desc: string;
	EqupAdvise: string;
	Parts: { Name: string; Labels: { Name: string; Levels: number[] }[] }[];
	Levels: { Title: string; Desc: string; Modifier: string; SuperPartProperties: PartProperty[] }[];
};

export type ModifierProperty = PartProperty &
	Partial<{ DisplayName: string; Desc: string; FunctionKind: string }>;

export type Modifier = {
	Name: string;
	DisplayName: string;
	Desc: '';
	MaxStack: 0;
	Duration: -1;
	Properties: ModifierProperty[];
	Type: 'Normal';
};

export type LabelView = {
	Label: string;
	BodyPart: string;
	CacheName: string;
	Lv: string;
	Weight?: string | undefined;
	LinkItem?: string | undefined;
	Name: string;
	DisplayName: string;
	Desc: string;
	Group: string;
	MaxLevel: number;
	Rate: number;
	Modifier: string[];
	SuperPartProperties?: PartProperty[] | undefined;
	LabelNumAddBone?: number | undefined;
	LabelNumAddOrgan?: number | undefined;
	LabelNumAddFlesh?: number | undefined;
};
