import { getLanguage, getSettings } from '../api/get-data';
import { createDataView } from '../util/create-data-table';
import { joinEnglishPaths } from '../util/join-english-paths';
import { stripAttributePrefix } from '../util/strip-attribute-keys';
import { omit } from 'ramda';
import type { SecretBody } from '../types';
import { createDataReader, dataViewExpand, dataViewShrink } from '../util/write-json';

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
							level.SuperPartProperties?.li?.map((part: any) => {
								const stripped = stripAttributePrefix(part);
								if (stripped.BAddV) {
									stripped.BAddV = Number.parseFloat(stripped.BAddV as string);
								} else if (stripped.AddP) {
									stripped.AddP = Number.parseFloat(stripped.AddP as string);
								} else if (stripped.AddV) {
									stripped.AddV = Number.parseFloat(stripped.AddV as string);
								}
								return stripped;
							}) ?? []
					}))
				};
			});
		})
		.flat();
	return createDataView(bodies, 'Name');
};

export const secretBodyReader = createDataReader(
	'SecretBodies',
	getSecretBodies,
	dataViewShrink,
	dataViewExpand
);
