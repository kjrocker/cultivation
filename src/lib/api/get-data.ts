import type { LanguageEnum } from 'src/types/language';
import type { SettingsEnum } from 'src/types/settings';
import { parse } from './parser';

const getXml = (fileName: string): Promise<string> => {
	return fetch(fileName)
		.then((val) => val.blob())
		.then((blob) => blob.text());
};

const prefix = './cultivation/ACS/Settings';

const getSettingsFile = async (file: SettingsEnum) => {
	const fileName = `${prefix}/${file}.xml`;
	return await getXml(fileName);
};

const getLanguageFile = async (file: LanguageEnum) => {
	const fileName = `${prefix}/Language/OfficialEnglish/Settings/${file}.xml`;
	return await getXml(fileName);
};

export const getSettings = async (file: SettingsEnum) => parse(await getSettingsFile(file));

export const getLanguage = async (file: LanguageEnum) => parse(await getLanguageFile(file));
