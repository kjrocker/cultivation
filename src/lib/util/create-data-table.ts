import { indexBy } from 'ramda';

export interface DataView<T> {
	keys: string[];
	list: T[];
	map: Record<string, T>;
}

export const createDataView = <T extends any>(data: T[], key: keyof T): DataView<T> => ({
	keys: data.map((d) => d[key] as unknown as string),
	list: data,
	map: indexBy((d: T) => {
		return d[key] as unknown as string;
	}, data)
});
