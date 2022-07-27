import type { PartLabelStore } from '$lib/components/stores/part-label-store';
import type { SecretBody } from '$lib/data/get-secret-bodies';
import { difference, values } from 'ramda';

export const isBodyComplete = (
	body: SecretBody,
	parts: PartLabelStore
): Record<string, boolean> => {
	let secretBodyParts = body.Parts;
	return secretBodyParts?.reduce((acc, part) => {
		const needed = part.Labels.map((l) => l.Name);
		const current = parts[part.Name]?.map((l) => l.Name) ?? [];
		acc[part.Name] = difference(needed, current).length === 0;
		return acc;
	}, {} as Record<string, boolean>);
};

export const isWholeBodyComplete = (body: SecretBody, parts: PartLabelStore): boolean => {
	return values(isBodyComplete(body, parts)).every((v) => v);
};
