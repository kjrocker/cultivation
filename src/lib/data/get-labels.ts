import { getLanguage, getSettings } from '$lib/api/get-data';
import { A_PREFIX } from '$lib/api/parser';
import { renameKey } from '$lib/util/rename-key';
import { stripAttributePrefix } from '$lib/util/strip-attribute-keys';
import { groupBy, indexBy, map, prop } from 'ramda';

export type PartProperty =
	| { Name: string; AddP: string }
	| { Name: string; AddV: string }
	| { Name: string; BAddV: string };

export type LabelView = {
	Name: string;
	DisplayName: string;
	Desc: string;
	Group: string;
	MaxLevel: number;
	LinkItem: string[];
	SuperPartProperties?: PartProperty[];
	Rate: number;
	Modifier: string;
	BodyPart: string;
};

export const getLabels = async (): Promise<LabelView[]> => {
	const [$labels, $data, $english] = await Promise.all([
		getSettings('Practice/BodyPractice/LabelCache/LabelCache'),
		getSettings('Practice/BodyPractice/QuenchingLabel/QuenchingLabel'),
		getLanguage('Practice/BodyPractice/QuenchingLabel/QuenchingLabel')
	]);

	const labels: { Name: string; Label: string; BodyPart: string; LinkItem: string }[] =
		$labels.BPLabelCacheDefs.List.Def.map((cache: any) => {
			if (cache[`${A_PREFIX}Name`] === 'LostCache') return undefined;
			const { Labels, ...rest } = cache;
			const parent = stripAttributePrefix(rest);
			return Labels.li.map((label: unknown) => ({ ...parent, ...stripAttributePrefix(label) }));
		})
			.flat()
			.filter((label: any) => !!label);

	const labelView = labels
		.map((label) => ({
			BodyPart: label.BodyPart,
			LinkItem: label.LinkItem,
			Label: label.Label
		}))
		.reduce((acc, val) => {
			const current = acc[val.Label];
			if (current && val.LinkItem) {
				acc[val.Label] = {
					BodyPart: current.BodyPart,
					LinkItem: [...current.LinkItem, val.LinkItem]
				};
			} else {
				acc[val.Label] = { BodyPart: val.BodyPart, LinkItem: val.LinkItem ? [val.LinkItem] : [] };
			}
			return acc;
		}, {} as Record<string, { LinkItem: string[]; BodyPart: string }>);

	const data: {
		DisplayName: string;
		Group: string;
		MaxLevel: number;
		Name: string;
		Rate: number;
		Modifier: string;
		SuperPartProperties?: PartProperty[];
	}[] = $data.BodyQuenchingLabelDefs.List.Def.map((def: any) => {
		return {
			...stripAttributePrefix(def),
			SuperPartProperties: def.SuperPartProperties?.li.map((prop: any) =>
				stripAttributePrefix(prop)
			)
		};
	});

	const english: Record<string, { Name: string; DisplayName: string; Desc: string }> = indexBy(
		prop('Name'),
		$english.Texts.List.Text.map((text: any) => renameKey(`${A_PREFIX}Name`, 'Name', text))
	);

	return data.map((d) => ({ ...d, ...english[d.Name], ...labelView[d.Name] }));
};
