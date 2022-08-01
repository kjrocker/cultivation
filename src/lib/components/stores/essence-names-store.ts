import { getLanguage } from '$lib/api/get-data';

import { createStaticAsyncStore } from '$lib/data/async-readable-store';
import { createDataView } from '$lib/util/create-data-table';
import { stripAttributePrefix } from '$lib/util/strip-attribute-keys';

export type EssenceName = { ThingName: string; Desc: string; Name: string };

export const getEssenceNames = async () => {
	const $essences = await getLanguage('ThingDef/Item/Item_BodyPracticeItem');
	const essences: EssenceName[] = $essences.Texts.List.Text.map(
		(s: any): EssenceName => stripAttributePrefix(s)
	);
	return createDataView(essences, 'Name');
};

export const essenceStore = createStaticAsyncStore(getEssenceNames);
