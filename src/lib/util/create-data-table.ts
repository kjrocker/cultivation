import { indexBy } from 'ramda';

export const createDataView = <T extends any>(data: T[], key: keyof T) => ({
	keys: data.map((d) => d[key] as unknown as string | number),
	list: data,
	map: indexBy((d: T) => {
		return d[key] as unknown as string | number;
	}, data)
});
