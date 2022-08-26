import type { BodyOptions } from '$lib/components/stores/options-store';

export const getRemoldCount = (kind: 'Flesh' | 'Bone' | 'Organ', options: BodyOptions) => {
	switch (kind) {
		case 'Flesh':
			return 6 + (options.temperedHeart ? 2 : 0) + (options.transcendantHeart ? 1 : 0);
		case 'Bone':
			return 6 + (options.temperedSpine ? 2 : 0) + (options.fireSpine ? 1 : 0);
		case 'Organ':
			return 6 + (options.temperedBrain ? 2 : 0) + (options.illusionBrain ? 1 : 0);
		default:
			return 6;
	}
};
