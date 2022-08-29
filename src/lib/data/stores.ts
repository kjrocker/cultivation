import type { SpeciesKeys } from './species';
import type { BodyPart } from './types';
import { createStaticAsyncStore } from './util/async-readable-store';
import type { DataView } from './util/create-data-table';
import { bodyLawReader } from './xml/get-body-laws';
import { bodyPartsReader } from './xml/get-body-parts';
import { essenceReader } from './xml/get-essence-names';

export const bodyLawStore = createStaticAsyncStore(bodyLawReader.read);
export const essenceStore = createStaticAsyncStore(essenceReader.read);
export const bodyPartsStore = createStaticAsyncStore<
	DataView<BodyPart> & { species: Record<SpeciesKeys, string[]> }
	// @ts-expect-error
>(bodyPartsReader.read);
