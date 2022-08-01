import { curry, fromPairs, map, adjust, toPairs } from 'ramda';

// @ts-expect-error Utility function, any is fine
export const mapKeys = curry((fn, obj) => fromPairs(map(adjust(0, fn), toPairs(obj))));
