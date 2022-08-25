import { getLanguage } from './api/get-data';
import { createStaticAsyncStore } from './util/async-readable-store';
import { createDataView } from './util/create-data-table';
import { stripAttributePrefix } from './util/strip-attribute-keys';

export type EssenceName = { ThingName: string; Desc: string; Name: string };

export const getEssenceNames = async () => {
	const $essences = await getLanguage('ThingDef/Item/Item_BodyPracticeItem');
	const essences: EssenceName[] = $essences.Texts.List.Text.map(
		(s: any): EssenceName => stripAttributePrefix(s)
	);
	return createDataView(essences, 'Name');
};

export const essenceStore = createStaticAsyncStore(getEssenceNames);
