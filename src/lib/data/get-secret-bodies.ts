import { getLanguage, getSettings } from '$lib/api/get-data';
import { createDataView } from '$lib/util/create-data-table';
import { joinEnglishPaths } from '$lib/util/join-english-paths';
import type { PartProperty } from '$lib/util/part-properties';
import { stripAttributePrefix } from '$lib/util/strip-attribute-keys';
import { omit } from 'ramda';
import { createStaticAsyncStore } from './async-readable-store';

export type SecretBody = {
	Name: string;
	DisplayName: string;
	Desc: string;
	EqupAdvise: string;
	Parts: { Name: string; Labels: { Name: string; Levels: number[] }[] }[];
	Levels: { Title: string; Desc: string; Modifier: string; SuperPartProperties: PartProperty[] }[];
};

export const getSecretBodies = async () => {
	const $bodies = await Promise.all([
		getSettings('Practice/BodyPractice/SuperPart/SuperPart_All_Gong1'),
		getSettings('Practice/BodyPractice/SuperPart/SuperPart_All_Gong2'),
		getSettings('Practice/BodyPractice/SuperPart/SuperPart_All_Gong3'),
		getSettings('Practice/BodyPractice/SuperPart/SuperPart_All_Gong5')
	]);

	const $english = await Promise.all([
		getLanguage('Practice/BodyPractice/SuperPart/SuperPart_All_Gong1'),
		getLanguage('Practice/BodyPractice/SuperPart/SuperPart_All_Gong2'),
		getLanguage('Practice/BodyPractice/SuperPart/SuperPart_All_Gong3'),
		getLanguage('Practice/BodyPractice/SuperPart/SuperPart_All_Gong5')
	]);

	const english = $english.map((eng) => {
		return eng.Texts.List.Text;
	});
	const bodies: SecretBody[] = $bodies
		.map((value, i) => {
			const bodyList = value.BPSuperPartDefs.List.Def;
			return bodyList.map((body: any, j: number) => {
				const translated = joinEnglishPaths(english[i][j], body, (key) =>
					typeof key === 'number' ? ['li', key] : key
				);
				return {
					DisplayName: `${translated.Prefix} ${translated.Suffix}`,
					...omit(
						[
							'AtkAni',
							'DefAni',
							'AtkEffect',
							'DefEffect',
							'EffectColor',
							'Parts',
							'Levels',
							'Prefix',
							'Suffix'
						],
						stripAttributePrefix(translated)
					),
					Parts: translated.Parts.li.map((part: any) => ({
						...stripAttributePrefix(part),
						Labels: part.Labels.li.map((label: any) => {
							const stripped: any = stripAttributePrefix(label);
							return {
								...stripped,
								Levels: stripped.Levels.split(',').map((lvl: any) => Number.parseInt(lvl))
							};
						})
					})),
					Levels: translated.Levels.li.map((level: any) => ({
						...level,
						SuperPartProperties:
							level.SuperPartProperties?.li?.map((part: any) => stripAttributePrefix(part)) ?? []
					}))
				};
			});
		})
		.flat();
	return createDataView(bodies, 'Name');
};

export const secretBodyStore = createStaticAsyncStore(getSecretBodies);
