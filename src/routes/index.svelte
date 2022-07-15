<script lang="ts">
	import { getLanguage, getSettings } from '$lib/data/get-data';
	import { init, lensPath, view, omit } from 'ramda';

	const bodyPartKindBlacklist = ['Virtual', 'Meridian'];
	const bodyPartNameBlacklist = ['HumanBody', 'YGAnimal_SnakeBody', 'Head', 'Body'];

	const human = Promise.all([getSettings('Npc/Body/Human'), getLanguage('Npc/Body/Human')]).then(
		([data, english]) => {
			const partNames: Record<string, string> = english.Texts.List.Text;
			let bodyParts: unknown = data.BodyDefs.List.BodyDef;
			console.log(bodyParts, partNames);
			const parts = Object.keys(partNames)
				.map((key) => {
					const name = partNames[key];
					const originalPath = init(key.split('.'));
					const path = lensPath(
						originalPath
							.map((str) =>
								Number.isInteger(Number.parseInt(str)) ? ['li', Number.parseInt(str)] : str
							)
							.flat()
					);
					return { ...view(path, bodyParts), '@_DisplayName': name };
				})
				.filter((part) => !bodyPartKindBlacklist.includes(part['@_Kind']))
				.filter((part) => !bodyPartNameBlacklist.includes(part['@_Name']))
				.map((val) => {
					return omit(['Part', 'Group', 'Groups', 'Parts', 'Function', 'Links'], val);
				});
			return parts;
		}
	);

	const snake = Promise.all([
		getSettings('Npc/Body/YGAnimal_Snake'),
		getLanguage('Npc/Body/YGAnimal_Snake')
	]).then(([data, english]) => {
		const partNames: Record<string, string> = english.Texts.List.Text;
		let bodyParts: unknown = data.BodyDefs.List.BodyDef;
		console.log(bodyParts, partNames);
		const parts = Object.keys(partNames)
			.map((key) => {
				const name = partNames[key];
				const originalPath = init(key.split('.'));
				const path = lensPath(
					originalPath
						.map((str) =>
							Number.isInteger(Number.parseInt(str)) ? ['li', Number.parseInt(str)] : str
						)
						.flat()
				);
				return { ...view(path, bodyParts), '@_DisplayName': name };
			})
			.filter((part) => !bodyPartKindBlacklist.includes(part['@_Kind']))
			.filter((part) => !bodyPartNameBlacklist.includes(part['@_Name']))
			.map((val) => {
				return omit(['Part', 'Group', 'Groups', 'Parts', 'Function', 'Links'], val);
			});
		return parts;
	});
</script>

{#await human then value}
	<ul class="list-disc list-inside">
		{#each value as part}
			<li>{part['@_DisplayName']}</li>
		{/each}
	</ul>
{/await}

{#await snake then value}
	<ul class="list-disc list-inside">
		{#each value as part}
			<li>{part['@_DisplayName']}</li>
		{/each}
	</ul>
{/await}
