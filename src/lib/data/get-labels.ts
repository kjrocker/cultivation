import { getLanguage, getSettings } from '$lib/api/get-data';

const getLabels = async (kind: 'Bone' | 'Flesh' | 'Organ') => {
	const [labels, data, english] = await Promise.all([
		getSettings('Practice/BodyPractice/LabelCache/LabelCache'),
		getSettings('Practice/BodyPractice/QuenchingLabel/QuenchingLabel'),
		getLanguage('Practice/BodyPractice/QuenchingLabel/QuenchingLabel')
	]);
};
