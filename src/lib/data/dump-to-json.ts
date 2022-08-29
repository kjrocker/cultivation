import { bodyLawReader } from './xml/get-body-laws';
import { bodyPartsReader } from './xml/get-body-parts';
import { essenceReader } from './xml/get-essence-names';

bodyLawReader.write();
essenceReader.write();
bodyPartsReader.write();
