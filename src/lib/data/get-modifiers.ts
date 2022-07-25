import { getLanguage, getSettings } from '$lib/api/get-data';
import { A_PREFIX } from '$lib/api/parser';
import { createDataView } from '$lib/util/create-data-table';
import { stripAttributePrefix } from '$lib/util/strip-attribute-keys';
import { indexBy } from 'ramda';
import { createStaticAsyncStore } from './async-readable-store';
import type { PartProperty } from './get-labels';

export type Modifier = {
	Name: string;
	DisplayName: string;
	Desc: '';
	MaxStack: 0;
	Duration: -1;
	Properties: PartProperty[];
	Type: 'Normal';
};

export const getModifiers = async () => {
	const $settings = await Promise.all([
		getSettings('Modifiers/BodyPractice/Modifier_BodyPractice_QuenchingLabel'),
		getSettings('Modifiers/BodyPractice/Modifier_BodyPractice_SuperPart')
	]);
	const $english = await Promise.all([
		getLanguage('Modifiers/BodyPractice/Modifier_BodyPractice_QuenchingLabel'),
		getLanguage('Modifiers/BodyPractice/Modifier_BodyPractice_SuperPart')
	]);

	const english = indexBy(
		(v: any) => v.Name,
		$english.flatMap((texts) => texts.Texts.List.Text).map((t) => stripAttributePrefix(t))
	);

	const settings = $settings
		.flatMap((modifiers) => modifiers.ModifierDefs.List.Modifier)
		.map((v: any) => ({
			...stripAttributePrefix(v),
			Properties: v.Properties.li.map((p: any) => stripAttributePrefix(p)),
			...english[v[`${A_PREFIX}Name`]]
		}));

	return createDataView(settings as Modifier[], 'Name');
};

export const modifierStore = createStaticAsyncStore(getModifiers);
