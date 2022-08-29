import type { DataView } from './create-data-table';
import fs from 'fs/promises';
import { omit } from 'ramda';
import axios from 'axios';

export const createDataReader = <T>(name: string, fn: () => Promise<DataView<T>>) => {
	return {
		// Write results of function to JSON, only works from node
		write: async () => {
			const data = await fn();
			await fs.writeFile(`./static/Data/${name}.json`, JSON.stringify(omit(['list'], data)));
		},
		read: async (): Promise<DataView<T>> => {
			const data = (await axios
				.get(`/cultivation/Data/${name}.json`)
				.then((response) => response.data)) as Omit<DataView<T>, 'list'>;
			return { ...data, list: data.keys.map((k) => data.map[k]) };
		}
	};
};
