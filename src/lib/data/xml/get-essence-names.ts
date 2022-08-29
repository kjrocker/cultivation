import { getLanguage } from '../api/get-data';
import type { EssenceName } from '../types';
import { createDataView } from '../util/create-data-table';
import { stripAttributePrefix } from '../util/strip-attribute-keys';
import { createDataReader, dataViewExpand, dataViewShrink } from '../util/write-json';

export const getEssenceNames = async () => {
	const $essences = await getLanguage('ThingDef/Item/Item_BodyPracticeItem');
	const essences: EssenceName[] = $essences.Texts.List.Text.map(
		(s: any): EssenceName => stripAttributePrefix(s)
	);
	return createDataView(essences, 'Name');
};

export const essenceReader = createDataReader(
	'Essences',
	getEssenceNames,
	dataViewShrink,
	dataViewExpand
);
