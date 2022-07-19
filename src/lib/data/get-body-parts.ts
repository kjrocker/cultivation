import { getLanguage, getSettings } from '$lib/api/get-data';
import { A_PREFIX } from '$lib/api/parser';
import { createDataView } from '$lib/util/create-data-table';
import { stripAttributePrefix } from '$lib/util/strip-attribute-keys';
import { indexBy, init, lensPath, omit, set, view, mapObjIndexed } from 'ramda';
import { SPECIES_CONFIG, SPECIES_OPTIONS, type SpeciesKeys } from './species';

const excludeKinds = ['Virtual', 'Meridian'];

export type BodyPart = {
	Name: string;
	DisplayName: string;
	Species: SpeciesKeys;
	Kind: 'Bone' | 'Flesh' | 'Organ';
};

export const getAllBodyParts = async () => {
	const bodyPartLists = await Promise.all(
		SPECIES_OPTIONS.map(async (opt) => await getBodyParts(opt.key))
	);
	return mapObjIndexed(
		(list: BodyPart[]) => createDataView(list, 'Name'),
		indexBy((a) => a[0].Species, bodyPartLists)
	);
};

const getBodyParts = (species: SpeciesKeys): Promise<BodyPart[]> => {
	const config = SPECIES_CONFIG[species];
	return Promise.all([getSettings(config.setting), getLanguage(config.language)]).then(
		([data, english]) => {
			const partNames: Record<string, string> = english.Texts.List.Text;
			let bodyParts: unknown = data.BodyDefs.List.BodyDef;
			const parts = Object.keys(partNames)
				.map((key) => {
					const name = partNames[key];
					const originalPath = init(key.split('.'));
					const path = lensPath(
						originalPath
							.map((str) =>
								Number.isInteger(Number.parseInt(str)) ? ['li', Number.parseInt(str)] : str
							)
							.flat()
					);
					return stripAttributePrefix({
						...view(path, bodyParts),
						Species: species,
						[`${A_PREFIX}DisplayName`]: name
					}) as BodyPart;
				})
				.filter((part) => !excludeKinds.includes(part.Kind))
				.filter((part) =>
					Array.isArray(config.excludeNames) ? !config.excludeNames.includes(part.Name) : true
				)
				.map((val) => {
					return omit(['Part', 'Group', 'Groups', 'Parts', 'Function', 'Links'], val);
				});
			return parts;
		}
	);
};
