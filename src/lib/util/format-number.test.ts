import { formatNumber } from './format-number';

describe('formatNumber', () => {
	it('formats numbers with no options', () => {
		expect(formatNumber(100)).toBe('100');
	});

	it('formats percentages', () => {
		expect(formatNumber(100, { percentage: true })).toBe('10,000%');
	});

	it('rounds to whole numbers', () => {
		expect(formatNumber(100.5)).toBe('101');
	});

	it('rounds to other precisions', () => {
		expect(formatNumber(100.005, { precision: 2 })).toBe('100.01');
	});

	it('does locale formatting', () => {
		expect(formatNumber(1000, { locale: true })).toBe('1,000');
	});

	it('locale is true by default', () => {
		expect(formatNumber(1000)).toBe('1,000');
	});

	it('can suppress locale formatting', () => {
		expect(formatNumber(1000, { locale: false })).toBe('1000');
	});

	it('can combine percentage and rate (no actual use for this)', () => {
		expect(formatNumber(1, { percentage: true, rate: true })).toBe('100%/sec');
	});
});
