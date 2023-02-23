import { parsePartProperties } from './part-properties';

describe('parsePartProperies', () => {
	it('converts BAddV', () => {
		expect(parsePartProperties({ Name: 'Potato', BAddV: '1' })).toEqual({
			Name: 'Potato',
			BAddV: 1
		});
	});
});
