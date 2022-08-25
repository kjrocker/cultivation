import { curry, assoc, prop, dissoc } from 'ramda';

export const renameKey = curry((oldKey, newKey, obj) =>
	assoc(newKey, prop(oldKey, obj), dissoc(oldKey, obj))
);
