import { curry, multiply, pipe, when, clamp } from 'ramda';

const roundTo = curry(function roundTo(precision: number, num: number) {
	// @ts-expect-error this is some type coercion magic
	return +(Math.round(num + `e+${precision}`) + `e-${precision}`);
});

export const formatNumber = (
	num: number,
	config: Partial<{
		percentage: boolean;
		rate: boolean;
		precision: number;
		locale: boolean;
	}> = {}
): string => {
	const { percentage = false, rate = false, precision = 0, locale = true } = config;
	return pipe(
		when(() => percentage, multiply(100)),
		roundTo(precision),
		(n: number) => (locale ? n.toLocaleString() : n.toString()),
		when(
			() => percentage,
			(v: string) => `${v}%`
		),
		when(
			() => rate,
			(v: string) => `${v}/sec`
		)
	)(num);
};
