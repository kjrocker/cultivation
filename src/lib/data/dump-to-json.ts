import { bodyLawReader } from './xml/get-body-laws';
import { bodyPartsReader } from './xml/get-body-parts';
import { essenceReader } from './xml/get-essence-names';
import { labelReader } from './xml/get-labels';
import { modifierReader } from './xml/get-modifiers';
import { secretBodyReader } from './xml/get-secret-bodies';

bodyLawReader.write();
essenceReader.write();
bodyPartsReader.write();
labelReader.write();
secretBodyReader.write();
modifierReader.write();
