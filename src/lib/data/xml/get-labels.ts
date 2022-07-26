import { getSettings, getLanguage } from '../api/get-data';
import { A_PREFIX } from '../api/parser';
import { createDataView } from '../util/create-data-table';
import { parsePartProperties } from '../util/part-properties';
import { renameKey } from '../util/rename-key';
import { stripAttributePrefix } from '../util/strip-attribute-keys';
import { indexBy, isEmpty, prop } from 'ramda';
import { createStaticAsyncStore } from '../util/async-readable-store';
import { TemperedLabelConfig } from '../tempering-config';
import type { LabelView, PartProperty } from '../types';
import { createDataReader, dataViewExpand, dataViewShrink } from '../util/write-json';

const LabelNameBlockList = ['BQLabel_LOST'];

export const getLabels = async () => {
	const [$labels, $data, $english] = await Promise.all([
		getSettings('Practice/BodyPractice/LabelCache/LabelCache'),
		getSettings('Practice/BodyPractice/QuenchingLabel/QuenchingLabel'),
		getLanguage('Practice/BodyPractice/QuenchingLabel/QuenchingLabel')
	]);

	const labels: Record<
		string,
		{
			Label: string;
			BodyPart: string;
			CacheName: string;
			Lv: string;
			Weight?: string;
			LinkItem?: string;
		}
	> = $labels.BPLabelCacheDefs.List.Def.reduce((acc: any, cache: any) => {
		if (cache && cache.Labels) {
			const CacheName = cache[`${A_PREFIX}Name`];
			const transformLabel = (v: any) => ({ ...stripAttributePrefix(v), CacheName });
			cache.Labels.li.forEach((v: any) => {
				const newLabel = transformLabel(v);
				// @ts-expect-error internal Type safety is overrated, it's static data
				acc[newLabel.Label] = newLabel;
			});
			return acc;
		} else {
			return acc;
		}
	}, {});

	const data: {
		DisplayName: string;
		Group: string;
		MaxLevel: number;
		Name: string;
		Rate: number;
		Modifier: string[];
		SuperPartProperties?: PartProperty[];
		LabelNumAddBone?: number;
		LabelNumAddOrgan?: number;
		LabelNumAddFlesh?: number;
	}[] = $data.BodyQuenchingLabelDefs.List.Def.map((def: any) => {
		const newLabelDef = {
			...stripAttributePrefix(def),
			Modifier: [def.Modifier],
			SuperPartProperties: def.SuperPartProperties?.li.map((prop: any) =>
				parsePartProperties(stripAttributePrefix(prop))
			)
		};
		return newLabelDef;
	});

	const english: Record<string, { Name: string; DisplayName: string; Desc: string }> = indexBy(
		prop('Name'),
		$english.Texts.List.Text.map((text: any) => renameKey(`${A_PREFIX}Name`, 'Name', text))
	);

	const views = data
		.filter((d) => !!d && !LabelNameBlockList.includes(d.Name))
		.map((d) => ({ ...d, ...english[d.Name], ...labels[d.Name] } as LabelView));

	const extendedViews = views.map((view, idx, list) => {
		if (!TemperedLabelConfig[view.Name]) return view;
		const config = TemperedLabelConfig[view.Name];
		const inherited = config.inherits
			.map((name) => list.find((l) => l.Name === name))
			.filter((v) => v) as LabelView[];
		return inherited.reduce((newView, next) => {
			const modifiers = [...newView.Modifier, ...next.Modifier].filter((v) => v && !isEmpty(v));
			const properties = [
				...(newView?.SuperPartProperties ?? []),
				...(next?.SuperPartProperties ?? [])
			].filter((v) => v);
			return { ...newView, Modifier: modifiers, SuperPartProperties: properties };
		}, view);
	});

	return createDataView(extendedViews, 'Name');
};

export const labelReader = createDataReader('Labels', getLabels, dataViewShrink, dataViewExpand);
