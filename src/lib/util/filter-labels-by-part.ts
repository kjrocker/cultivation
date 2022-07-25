import type { BodyPart } from '../data/get-body-parts';
import type { LabelView } from '../data/get-labels';

const labelBlacklist = ['QuenchingLabel_Lv0_Base'];

export const filterLabelByPart = (part: BodyPart, label: LabelView): boolean => {
	if (!part) {
		return false;
	}
	if (labelBlacklist.includes(label.Name)) {
		return false;
	}
	if (label.BodyPart === 'Any' && !label.DisplayName.includes('Tempered')) {
		return true;
	}
	return label.BodyPart === part.Kind;
};
