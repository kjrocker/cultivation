import { A_PREFIX } from '../api/parser';
import { curry, fromPairs, map, adjust, toPairs } from 'ramda';

// @ts-expect-error Utility function, any is fine
const mapKeys = curry((fn, obj) => fromPairs(map(adjust(0, fn), toPairs(obj))));

export const stripAttributePrefix = mapKeys((key: string) =>
	key.startsWith(A_PREFIX) ? key.substring(A_PREFIX.length) : key
);
