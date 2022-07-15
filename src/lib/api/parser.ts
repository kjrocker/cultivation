import { XMLParser } from 'fast-xml-parser';

const ARRAY_TAGS = ['li'];
const ARRAY_ATTRIBUTES: string[] = [];

export const A_PREFIX = '@_';

const parser = new XMLParser({
	ignoreAttributes: false,
	allowBooleanAttributes: true,
	attributeNamePrefix: A_PREFIX,
	isArray: (name, _path, _isLeaf, isAttribute) => {
		if (ARRAY_TAGS.includes(name)) return true;
		if (isAttribute && ARRAY_ATTRIBUTES.includes(name)) {
			return true;
		}
		return false;
	}
});

export const parse = (xml: string) => {
	return parser.parse(xml);
};
