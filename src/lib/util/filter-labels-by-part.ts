import { TemperedPartConfig } from '$lib/data/tempering-config';
import type { BodyPart } from '../data/get-body-parts';
import type { LabelView } from '../data/get-labels';

const labelBlacklist = ['QuenchingLabel_Lv0_Base'];

export const filterLabelByPart = (part: BodyPart, label: LabelView): boolean => {
	if (!part) {
		return false;
	} else if (
		TemperedPartConfig[part.Name] &&
		TemperedPartConfig[part.Name]?.include.includes(label.Name)
	) {
		return true;
	} else if (
		TemperedPartConfig[part.Name] &&
		TemperedPartConfig[part.Name]?.exclude.includes(label.Name)
	) {
		return false;
	} else if (labelBlacklist.includes(label.Name)) {
		return false;
	} else if (label.BodyPart === 'Any' && !label.DisplayName.includes('Tempered')) {
		return true;
	}
	return label.BodyPart === part.Kind;
};
