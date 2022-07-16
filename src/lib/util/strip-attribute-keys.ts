import { A_PREFIX } from '$lib/api/parser';
import { mapKeys } from './mapKeys';

export const stripAttributePrefix = mapKeys((key: string) =>
	key.startsWith(A_PREFIX) ? key.substring(A_PREFIX.length) : key
);
