import { getLanguage, getSettings } from '../api/get-data';
import { A_PREFIX } from '../api/parser';
import { createDataView } from '../util/create-data-table';
import { joinEnglishPaths } from '../util/join-english-paths';
import { stripAttributePrefix } from '../util/strip-attribute-keys';
import { isEmpty, omit, uniqBy } from 'ramda';
import { SPECIES_OPTIONS, type SpeciesKeys } from '../species';
import type { BodyPart } from '../types';
import { createDataReader } from '../util/write-json';

const modifyTranslationPaths = (val: string | number) => {
	if (typeof val === 'number') {
		return ['li', val];
	} else if (val === 'DisplayName') {
		return `${A_PREFIX}DisplayName`;
	} else {
		return val;
	}
};

type PartsList = BodyPart & {
	Parts?: { li: PartsList[] };
};

const recursePartsList = (list: PartsList[]): BodyPart[] => {
	return list.reduce((acc, parts) => {
		if (!parts.Parts) {
			return [...acc, parts];
		} else {
			const extendedChildParts = parts.Parts.li.map((p) => ({
				...(stripAttributePrefix(p) as PartsList),
				PartGroup: parts.PartGroup + '.' + parts.Name,
				ParentName: parts.ParentName,
				ParentDisplayName: parts.ParentDisplayName
			}));
			return [...acc, omit(['Parts'], parts), ...recursePartsList(extendedChildParts)];
		}
	}, [] as BodyPart[]);
};

export const getBodyParts = async () => {
	const settingFiles = SPECIES_OPTIONS.map((o) => o.setting);
	const languageFiles = SPECIES_OPTIONS.map((o) => o.language);
	const $settings = await Promise.all([...settingFiles.map((file) => getSettings(file))]);
	const $language = await Promise.all([...languageFiles.map((file) => getLanguage(file))]);

	const settings = $settings.map(($parts, i) => {
		const translated = joinEnglishPaths(
			$language[i].Texts.List.Text,
			$parts.BodyDefs.List.BodyDef,
			modifyTranslationPaths
		);
		const parts = translated.Part.Parts.li
			.map((partList: any) => {
				if (partList.Parts?.li) {
					return partList.Parts.li.map((p: any) =>
						stripAttributePrefix({
							...p,
							PartGroup: partList[`${A_PREFIX}Name`],
							ParentName: partList[`${A_PREFIX}Name`],
							ParentDisplayName: partList[`${A_PREFIX}DisplayName`]
						})
					);
				}
			})
			.flat()
			.filter((v: any) => !isEmpty(v) && v !== undefined && v[`Kind`] !== 'Meridian');
		return recursePartsList(parts).map((partList) =>
			omit(['Function', 'Rate', 'Deadly', 'CantPractice'], partList)
		) as BodyPart[];
	});

	const speciesNameList: Record<SpeciesKeys, string[]> = SPECIES_OPTIONS.reduce((acc, opt, i) => {
		return {
			...acc,
			[opt.key]: settings[i].map((v) => v.Name).filter((name) => !opt.excludeNames?.includes(name))
		};
	}, {} as Record<SpeciesKeys, string[]>);

	const allParts = uniqBy((v) => v.Name, settings.flat());

	return { species: speciesNameList, ...createDataView(allParts, 'Name') };
};

export const bodyPartsReader = createDataReader('BodyParts', getBodyParts);
