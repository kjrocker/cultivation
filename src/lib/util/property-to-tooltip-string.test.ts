import type { PartProperty } from '../data/types';
import { propertyToString } from './property-to-tooltip-string';

describe('propertyToString', () => {
	it('handles base without level', () => {
		expect(propertyToString({ BAddV: 1 } as PartProperty)[0]).toBe('Base +1');
	});

	it('handles base with level', () => {
		expect(propertyToString({ BAddV: 1 } as PartProperty, 2)[0]).toBe('Base +2');
	});

	it('handles percentage without level', () => {
		expect(propertyToString({ AddP: 1 } as PartProperty)[0]).toBe('+100%');
	});

	it('handles percentage with level', () => {
		expect(propertyToString({ AddP: 1 } as PartProperty, 2)[0]).toBe('+200%');
	});

	it('handles bonus without level', () => {
		expect(propertyToString({ AddV: 1 } as PartProperty)[0]).toBe('+1');
	});

	it('handles bonus with level', () => {
		expect(propertyToString({ AddV: 1 } as PartProperty, 2)[0]).toBe('+2');
	});
});
