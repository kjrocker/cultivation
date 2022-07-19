import { init, set, lensPath, identity } from 'ramda';

type ExtendPaths = (v: string | number) => string | number | (string | number)[];

const transformRawPath = (path: string, extendPaths: ExtendPaths): (string | number)[] => {
	const originalPath = path.split('.');
	return originalPath
		.map((str) => {
			return Number.isInteger(Number.parseInt(str))
				? extendPaths(Number.parseInt(str))
				: extendPaths(str);
		})
		.flat();
};

const createEnglishLensFromPaths = (
	paths: Record<string, string>,
	extendPaths: ExtendPaths = identity
) => {
	return Object.keys(paths).map((key) => {
		const name = paths[key];
		const lens = lensPath(transformRawPath(key, extendPaths));
		return set(lens, name);
	});
};

export const joinEnglishPaths = <T extends Record<string, any>>(
	paths: Record<string, string>,
	data: T,
	extendPaths: ExtendPaths = identity
): T => {
	const lenses = createEnglishLensFromPaths(paths, extendPaths);
	return lenses.reduce((obj, lens) => {
		return lens(obj);
	}, data);
};
