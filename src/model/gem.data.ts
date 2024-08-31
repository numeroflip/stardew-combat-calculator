import { keysOf } from '$lib/objectUtils';
import type { GemName } from './gem';
import { getStatDescription, type Stats } from './stat';

export const gemData: Record<GemName, { stats: [Stats, Stats, Stats] }> = {
	emerald: {
		stats: [
			{
				speed: 2
			},
			{ speed: 3 },
			{ speed: 2 }
		]
	},
	amethyst: {
		stats: [
			{
				weight: 1
			},
			{ weight: 1 },
			{ weight: 1 }
		]
	},
	aquamarine: {
		stats: [
			{
				critChance: 0.046
			},
			{ critChance: 0.046 },
			{ critChance: 0.046 }
		]
	},
	jade: {
		stats: [
			{
				critPower: 0.1
			},
			{ critPower: 0.1 },
			{ critPower: 0.1 }
		]
	},
	ruby: {
		stats: [
			{
				damage: 0.1
			},
			{ damage: 0.1 },
			{ damage: 0.1 }
		]
	},
	topaz: {
		stats: [
			{
				defense: 1
			},
			{ defense: 1 },
			{ defense: 1 }
		]
	}
};

export function getGemDescription(gemName: GemName, level: number): string[] {
	const stats = gemData[gemName].stats;
	const stat = stats[level - 1];

	if (!stat) {
		return [''];
	}

	const statStrings = keysOf(stat)
		.map((statKey) => {
			const effectValue = stat[statKey];
			if (effectValue) {
				return getStatDescription(statKey, effectValue);
			}
		})
		.filter(Boolean);

	return statStrings;
}

export const gemIcon: Record<GemName | 'diamond', string> = {
	diamond: 'https://stardewvalleywiki.com/mediawiki/images/e/ea/Diamond.png',
	jade: 'https://stardewvalleywiki.com/mediawiki/images/7/7e/Jade.png',
	topaz: 'https://stardewvalleywiki.com/mediawiki/images/a/a5/Topaz.png',
	amethyst: 'https://stardewvalleywiki.com/mediawiki/images/2/2e/Amethyst.png',
	ruby: 'https://stardewvalleywiki.com/mediawiki/images/a/a9/Ruby.png',
	aquamarine: 'https://stardewvalleywiki.com/mediawiki/images/a/a2/Aquamarine.png',
	emerald: 'https://stardewvalleywiki.com/mediawiki/images/6/6a/Emerald.png'
};
