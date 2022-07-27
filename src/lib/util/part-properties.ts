export type PartProperty = { Name: string; AddP?: number; AddV?: number; BAddV?: number };

export const parsePartProperties = ({ Name, ...rest }: any): PartProperty => {
	if (rest.AddV) {
		return { Name, AddV: Number.parseFloat(rest.AddV) };
	} else if (rest.AddP) {
		return { Name, AddP: Number.parseFloat(rest.AddP) };
	} else {
		return { Name, BAddV: Number.parseFloat(rest.BAddV) };
	}
};
