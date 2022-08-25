import type { DataView } from './create-data-table';
import fs from 'fs/promises';
import { omit } from 'ramda';

export const writeJsonData = async <T>(name: string, fn: () => Promise<DataView<T>>) => {
	const data = await fn();
	await fs.writeFile(`./static/Data/${name}.json`, JSON.stringify(omit(['list'], data)));
};
