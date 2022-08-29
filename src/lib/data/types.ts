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
