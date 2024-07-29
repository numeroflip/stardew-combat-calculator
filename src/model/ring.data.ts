import { keysOf } from '$lib/objectUtils';
import type { Ring } from './ring';
import { getStatDescription } from './stat';

export const ringNames = [
	'iridiumBand',
	'ruby',
	'aquamarine',
	'jade',
	'emerald',
	'amethyst',
	'topaz',
	'crabshell'
] as const;

export type RingName = (typeof ringNames)[number];

export const rings: Record<RingName, Ring> = {
	iridiumBand: {
		name: 'Iridium Band',
		effect: { damage: 0.1 },
		icon: 'https://stardewvalleywiki.com/mediawiki/images/7/77/Iridium_Band.png'
	},
	amethyst: {
		name: 'Amethyst Ring',
		effect: { weight: 0.1 },
		icon: 'https://stardewvalleywiki.com/mediawiki/images/f/f9/Amethyst_Ring.png'
	},
	topaz: {
		name: 'Topaz Ring',
		effect: { defense: 1 },
		icon: 'https://stardewvalleywiki.com/mediawiki/images/8/8a/Topaz_Ring.png'
	},
	aquamarine: {
		name: 'Aquamarine Ring',
		effect: { critChance: 0.1 },
		icon: 'https://stardewvalleywiki.com/mediawiki/images/8/8d/Aquamarine_Ring.png'
	},
	jade: {
		name: 'Jade Ring',
		effect: { critMultiplier: 0.1 },
		icon: 'https://stardewvalleywiki.com/mediawiki/images/d/d8/Jade_Ring.png'
	},
	emerald: {
		name: 'Emerald Ring',
		effect: { speed: 0.1 },
		icon: 'https://stardewvalleywiki.com/mediawiki/images/8/8a/Emerald_Ring.png'
	},
	ruby: {
		name: 'Ruby Ring',
		effect: { damage: 0.1 },
		icon: 'https://stardewvalleywiki.com/mediawiki/images/d/d3/Ruby_Ring.png'
	},
	crabshell: {
		name: 'Crabshell Ring',
		effect: { defense: 5 },
		icon: 'https://stardewvalleywiki.com/mediawiki/images/e/eb/Crabshell_Ring.png'
	}
};

export function getRingDescription(ringName: RingName): string[] {
	const effects = rings[ringName].effect;

	const effectStrings = keysOf(effects)
		.map((effectKey) => {
			const effect = effects[effectKey];
			if (effect) {
				return getStatDescription(effectKey, effect);
			}
		})
		.filter(Boolean);

	return effectStrings;
}
