import { toUpper } from 'ramda';
import { mapKeys } from './mapKeys';

describe('mapKeys', () => {
	it('works', () => {
		expect(mapKeys(toUpper, { test: 1 })).toEqual({ TEST: 1 });
	});
});
