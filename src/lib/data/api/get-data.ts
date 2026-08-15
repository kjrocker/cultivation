import type { LanguageEnum } from 'src/types/language';
import type { SettingsEnum } from 'src/types/settings';
import fs from 'fs/promises';
import { parse } from './parser';

// The XML lives outside static/ so it is not copied into the build — it is an
// input to `yarn json`, not something the site serves. That makes this a
// node-only reader: the browser gets static/Data/*.json via createDataReader.
const getXml = (fileName: string): Promise<string> =>
	fs.readFile(`./${fileName}`).then((buffer) => buffer.toString());

const prefix = 'ACS/Settings';

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
