import { getLanguage, getSettings } from '$lib/api/get-data';
import { stripAttributePrefix } from '$lib/util/strip-attribute-keys';
import { init, lensPath, omit, set, view } from 'ramda';
import { SPECIES_CONFIG, type SpeciesKeys } from './species';

const excludeKinds = ['Virtual', 'Meridian'];

export type BodyPart = { Name: string; DisplayName: string; Kind: 'Bone' | 'Flesh' | 'Organ' };

export const getBodyParts = (species: SpeciesKeys): Promise<BodyPart[]> => {
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
						'@_DisplayName': name
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
