import { joinEnglishPaths } from './join-english-paths';

describe('joinEnglishPaths', () => {
	it('should work on simple objects', () => {
		const english = { Name: 'Hello' };
		const original = { Name: 'Bonjour' };
		expect(joinEnglishPaths(english, original)).toEqual({ Name: 'Hello' });
	});

	it('should follow object paths', () => {
		const english = { greeting: 'Hello', 'person.firstName': 'John', 'person.lastName': 'Smith' };
		const original = { greeting: 'Bonjour', person: { firstName: 'Jane', lastName: 'Doe' } };
		expect(joinEnglishPaths(english, original)).toEqual({
			greeting: 'Hello',
			person: { firstName: 'John', lastName: 'Smith' }
		});
	});
});
