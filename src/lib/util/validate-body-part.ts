import type { PartLabelStore } from '$lib/components/part-label-store';
import type { LabelView } from '$lib/data/get-labels';
import { countBy, isEmpty, maxBy, omit, pipe, reduce, toPairs, uniq } from 'ramda';

const reduceLabelsToGroups = pipe(
	countBy((l: LabelView) => l.Group),
	omit(['']),
	toPairs,
	(pairs: [string, number][]) =>
		!isEmpty(pairs)
			? pairs.reduce(maxBy((v: [string, number]) => v[1]))
			: (['', -Infinity] as [string, number])
);

const getMutuallyExclusiveErrorMessage = (labels: LabelView[]): string | undefined => {
	const [largestGroup, count] = reduceLabelsToGroups(labels);
	switch (count) {
		case -Infinity:
		case 0:
		case 1:
			return undefined;
		case 2:
			const badLabels = labels
				.filter((v) => v.Group === largestGroup)
				.map((v) => v.DisplayName) as [string, string];
			return `${badLabels[0]} and ${badLabels[1]} are contradictory.`;
		default:
			return 'Some labels are mutually exclusive';
	}
};

export const validateBodyPart = (
	part: string,
	partLabels: PartLabelStore,
	maxLabels: number
): string | undefined => {
	const labels = partLabels[part];
	// Empty Part
	if (!labels || (Array.isArray(labels) && labels.length === 0)) return undefined;

	// Tempering
	const isTempered = labels.map((v) => v.MaxLevel).some((max) => max >= 100);
	if (!isTempered) return 'All parts need to be Tempered';

	// Incompatible groups
	const groupError = getMutuallyExclusiveErrorMessage(labels);
	if (groupError) return groupError;

	if (maxLabels && labels.length > maxLabels) return 'There are too many labels.';

	return undefined;
};
