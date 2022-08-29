import { sumAndGroupProperties } from './get-all-modifier-groups';
import type { PartProperty } from '../data/types';

describe('sumAndGroupProperties', () => {
	it('returns expected results for the normal case', () => {
		const data: PartProperty[] = [
			{ Name: 'Atk', BAddV: 100 },
			{ Name: 'Atk', BAddV: 200 },
			{ Name: 'Atk', AddP: 1 },
			{ Name: 'Def', AddV: 200 }
		];
		expect(sumAndGroupProperties(data)).toMatchInlineSnapshot(`
			{
			  "Atk": {
			    "AddP": 1,
			    "AddV": 0,
			    "BAddV": 300,
			    "Name": "Atk",
			  },
			  "Def": {
			    "AddP": 0,
			    "AddV": 200,
			    "BAddV": 0,
			    "Name": "Def",
			  },
			}
		`);
	});

	it('returns expected results if a property adds multiple things', () => {
		const data: PartProperty[] = [
			{ Name: 'Atk', BAddV: 100, AddV: 100 },
			{ Name: 'Atk', BAddV: 200 },
			{ Name: 'Atk', AddP: 1 },
			{ Name: 'Def', AddV: 200 }
		];
		expect(sumAndGroupProperties(data)).toMatchInlineSnapshot(`
			{
			  "Atk": {
			    "AddP": 1,
			    "AddV": 100,
			    "BAddV": 300,
			    "Name": "Atk",
			  },
			  "Def": {
			    "AddP": 0,
			    "AddV": 200,
			    "BAddV": 0,
			    "Name": "Def",
			  },
			}
		`);
	});

	it('returns expected results if a property is a undefined', () => {
		const data: PartProperty[] = [
			{ Name: 'Atk', BAddV: undefined, AddV: 100 },
			{ Name: 'Atk', BAddV: 200 },
			{ Name: 'Atk', AddP: 1 },
			{ Name: 'Def', AddV: 200 }
		];
		expect(sumAndGroupProperties(data)).toMatchInlineSnapshot(`
			{
			  "Atk": {
			    "AddP": 1,
			    "AddV": 100,
			    "BAddV": 200,
			    "Name": "Atk",
			  },
			  "Def": {
			    "AddP": 0,
			    "AddV": 200,
			    "BAddV": 0,
			    "Name": "Def",
			  },
			}
		`);
	});
});
