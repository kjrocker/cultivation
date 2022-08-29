import fs from 'fs/promises';
import axios from 'axios';
import { omit } from 'ramda';
import type { DataView } from './create-data-table';

export const dataViewShrink = omit(['list']);
export const dataViewExpand = <T>(out: Omit<DataView<T>, 'list'>): DataView<T> => ({
	...out,
	list: out.keys.map((k) => out.map[k])
});

export const createDataReader = <In, Out>(
	name: string,
	fn: () => Promise<In>,
	shrink: (v: In) => Out,
	expand: (v: Out) => In
) => {
	return {
		// Write results of function to JSON, only works from node
		write: async () => {
			const data = await fn();
			await fs.writeFile(`./static/Data/${name}.json`, JSON.stringify(shrink(data)));
		},
		read: async (): Promise<In> => {
			const data = (await axios
				.get(`/cultivation/Data/${name}.json`)
				.then((response) => response.data)) as Out;
			return expand(data);
		}
	};
};
