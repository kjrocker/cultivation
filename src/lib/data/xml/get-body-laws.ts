import { getLanguage, getSettings } from '../api/get-data';
import { A_PREFIX } from '../api/parser';
import { createDataView } from '../util/create-data-table';
import { joinEnglishPaths } from '../util/join-english-paths';
import { stripAttributePrefix } from '../util/strip-attribute-keys';
import { omit } from 'ramda';
import { createDataReader } from '../util/write-json';
import type { BodyLaw } from '../types';

const transformBody = (body: any, english: any) => {
	const value = joinEnglishPaths(english, body.Gongs.List.Gong, (str) =>
		str === 'Stages' ? ['Stages', 'Stage'] : str
	);
	return stripAttributePrefix({
		...value,
		Magic: value.Magic.li,
		SuperParts: [
			...value.SuperParts.li,
			...value.Stages.Stage.map((stage: any) => {
				const neck = stage.Necks[0].Neck;
				return neck.SuperParts?.li ?? [];
			}).flat()
		],
		QuenchingMethods: [
			...value.QuenchingMethods.li,
			...value.Stages.Stage.map((stage: any) => {
				const neck = stage.Necks[0].Neck;
				return neck.QuenchingMethods?.li ?? [];
			}).flat()
		],
		Stages: value.Stages.Stage.map((stage: any) => {
			const neck = stage.Necks[0].Neck;
			return stripAttributePrefix({
				...stage,
				Necks: stripAttributePrefix({
					...neck,
					QuenchingMethods: neck.QuenchingMethods?.li,
					SuperParts: neck.SuperParts?.li
				})
			});
		})
	});
};

export const getBodyLaws = async () => {
	const $bodies = await Promise.all([
		getSettings('Practice/Gong/Body/Body_Gong_1'),
		getSettings('Practice/Gong/Body/Body_Gong_2'),
		getSettings('Practice/Gong/Body/Body_Gong_3'),
		getSettings('Practice/Gong/Body/Body_Gong_5')
	]);

	const $english = await Promise.all([
		getLanguage('Practice/Gong/Body/Body_Gong_1'),
		getLanguage('Practice/Gong/Body/Body_Gong_2'),
		getLanguage('Practice/Gong/Body/Body_Gong_3'),
		getLanguage('Practice/Gong/Body/Body_Gong_5')
	]);

	const english = $english.map((lang) => {
		return omit([`${A_PREFIX}Name`], lang.Texts.List.Text);
	});
	const bodies = $bodies
		// Apply translations, strip extra layers and tags
		.map((body, i) => transformBody(body, english[i]))
		// Remove unused properties
		.map((body: any) => ({
			...omit(
				['Magic', 'GongKind', 'Hide', 'ElementKind', 'SelectDesc', 'FiveBaseNeed', 'Stages'],
				body
			)
		}));

	return createDataView(bodies as BodyLaw[], 'Name');
};

export const bodyLawReader = createDataReader('BodyLaws', getBodyLaws);
