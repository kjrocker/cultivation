import { getLanguage, getSettings } from '$lib/api/get-data';
import { A_PREFIX } from '$lib/api/parser';
import { createDataView } from '$lib/util/create-data-table';
import { parsePartProperties, type PartProperty } from '$lib/util/part-properties';
import { stripAttributePrefix } from '$lib/util/strip-attribute-keys';
import { indexBy } from 'ramda';
import { createStaticAsyncStore } from './async-readable-store';

export type ModifierProperty = PartProperty &
	Partial<{ DisplayName: string; Desc: string; FunctionKind: string }>;

export type Modifier = {
	Name: string;
	DisplayName: string;
	Desc: '';
	MaxStack: 0;
	Duration: -1;
	Properties: ModifierProperty[];
	Type: 'Normal';
};

export const getModifiers = async () => {
	const $settings = await Promise.all([
		getSettings('Modifiers/BodyPractice/Modifier_BodyPractice_QuenchingLabel'),
		getSettings('Modifiers/BodyPractice/Modifier_BodyPractice_SuperPart')
	]);
	const $englishProperties = await Promise.all([
		getLanguage('Property/BodyPraticeProperty'),
		getLanguage('Property/FightProperty'),
		getLanguage('Property/PracticeProperty'),
		getLanguage('Property/RoleProperty')
	]);
	const $english = await Promise.all([
		getLanguage('Modifiers/BodyPractice/Modifier_BodyPractice_QuenchingLabel'),
		getLanguage('Modifiers/BodyPractice/Modifier_BodyPractice_SuperPart')
	]);

	const english = indexBy(
		(v: any) => v.Name,
		$english.flatMap((texts) => texts.Texts.List.Text).map((t) => stripAttributePrefix(t))
	);

	const properties = indexBy(
		(v: any) => v.Name,
		$englishProperties.flatMap((props) =>
			props.Texts.List.Text.map((t: any) => stripAttributePrefix(t))
		)
	);

	const settings = $settings
		.flatMap((modifiers) => modifiers.ModifierDefs.List.Modifier)
		.map((v: any) => ({
			...stripAttributePrefix(v),
			Properties: v.Properties.li.map((p: any) => {
				const prop = parsePartProperties(stripAttributePrefix(p));
				return { ...prop, ...properties[prop.Name] };
			}),
			...english[v[`${A_PREFIX}Name`]]
		}));

	return createDataView(settings as Modifier[], 'Name');
};

export const modifierStore = createStaticAsyncStore(getModifiers);
