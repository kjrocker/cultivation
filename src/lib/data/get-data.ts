import { XMLParser } from 'fast-xml-parser';
import type { LanguageEnum } from 'src/types/language';
import type { SettingsEnum } from 'src/types/settings';

const getSettingsFile = async (file: SettingsEnum) => {
	return fetch(`/ACS/Settings/${file}.xml`)
		.then((val) => val.blob())
		.then((blob) => blob.text());
};

const getLanguageFile = async (file: LanguageEnum) => {
	return fetch(`/ACS/Settings/Language/OfficialEnglish/Settings/${file}.xml`)
		.then((val) => val.blob())
		.then((blob) => blob.text());
};

const parser = new XMLParser({
	ignoreAttributes: false,
	allowBooleanAttributes: true,
	isArray: (name, path, isLeaf, isAttribute) => {
		if (name === 'li') return true;
		return false;
	}
});

const parse = (xml: string) => {
	return parser.parse(xml);
};

export const getSettings = async (file: SettingsEnum) => parse(await getSettingsFile(file));

export const getLanguage = async (file: LanguageEnum) => parse(await getLanguageFile(file));

// const STATIC_QUERY: UseQueryOptions = {
// 	refetchOnMount: false,
// 	refetchOnReconnect: false,
// 	refetchOnWindowFocus: false,
// 	staleTime: Infinity
// };

// export const useSettings = <Data = unknown, Error = unknown>(
// 	file: SettingsEnum
// ): UseQueryResult<Data, Error> => {
// 	// @ts-expect-error
// 	return useQuery(file, () => getSettings(file), STATIC_QUERY);
// };

// export const useLanguage = <Data = unknown, Error = unknown>(
// 	file: LanguageEnum
// ): UseQueryResult<Data, Error> => {
// 	// @ts-expect-error
// 	return useQuery(file, () => getLanguage(file), STATIC_QUERY);
// };
