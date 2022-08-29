import { createStaticAsyncStore } from './util/async-readable-store';
import { bodyLawReader } from './xml/get-body-laws';
import { bodyPartsReader } from './xml/get-body-parts';
import { essenceReader } from './xml/get-essence-names';
import { labelReader } from './xml/get-labels';
import { modifierReader } from './xml/get-modifiers';
import { secretBodyReader } from './xml/get-secret-bodies';

export const bodyLawStore = createStaticAsyncStore(bodyLawReader.read);
export const essenceStore = createStaticAsyncStore(essenceReader.read);
export const bodyPartsStore = createStaticAsyncStore(bodyPartsReader.read);
export const modifierStore = createStaticAsyncStore(modifierReader.read);
export const secretBodyStore = createStaticAsyncStore(secretBodyReader.read);
export const labelStore = createStaticAsyncStore(labelReader.read);
