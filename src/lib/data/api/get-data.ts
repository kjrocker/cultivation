import type { LanguageEnum } from 'src/types/language';
import type { SettingsEnum } from 'src/types/settings';
import axios from 'axios';
import fs from 'fs/promises';
import { parse } from './parser';

const isNode = (): boolean => {
	return typeof module === 'object' && typeof module.exports === 'object';
};

const getXml = (fileName: string): Promise<string> => {
	if (isNode()) {
		return fs.readFile(`./static/${fileName}`).then((buffer) => buffer.toString());
	}
	return axios.get(`/cultivation/${fileName}`).then((response) => response.data);
};

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
