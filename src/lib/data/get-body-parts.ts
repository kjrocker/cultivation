import { getLanguage, getSettings } from '$lib/api/get-data';
import { A_PREFIX } from '$lib/api/parser';
import { mapKeys } from '$lib/util/mapKeys';
import { init, lensPath, omit, view } from 'ramda';
import { SPECIES_CONFIG, type SpeciesKeys } from './species';

const excludeKinds = ['Virtual', 'Meridian'];

type BodyPart = { Name: string; DisplayName: string; Kind: 'Bone' | 'Flesh' | 'Organ' };

const stripAttributePrefix = mapKeys((key: string) =>
	key.startsWith(A_PREFIX) ? key.substring(A_PREFIX.length) : key
);

export const getBodyParts = (species: SpeciesKeys): Promise<BodyPart[]> => {
	const config = SPECIES_CONFIG[species];
	return Promise.all([getSettings(config.setting), getLanguage(config.language)]).then(
		([data, english]) => {
			const partNames: Record<string, string> = english.Texts.List.Text;
			let bodyParts: unknown = data.BodyDefs.List.BodyDef;
			console.log(bodyParts, partNames);
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
