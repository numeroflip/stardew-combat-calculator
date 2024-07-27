import type { Ring } from './ring';

type RingName =
	| 'iridiumBand'
	| 'amethyst'
	| 'topaz'
	| 'aquamarine'
	| 'jade'
	| 'emerald'
	| 'ruby'
	| 'crabshell';

export const rings: Record<RingName, Ring> = {
	iridiumBand: {
		name: 'Iridium Band',
		effect: { damage: 0.1 }
	},
	amethyst: {
		name: 'Amethyst Ring',
		effect: { weight: 0.1 }
	},
	topaz: {
		name: 'Topaz Ring',
		effect: { defense: 1 }
	},
	aquamarine: {
		name: 'Aquamarine Ring',
		effect: { critChance: 0.1 }
	},
	jade: {
		name: 'Jade Ring',
		effect: { critMultiplier: 0.1 }
	},
	emerald: {
		name: 'Emerald Ring',
		effect: { speed: 0.1 }
	},
	ruby: {
		name: 'Ruby Ring',
		effect: { damage: 0.1 }
	},
	crabshell: {
		name: 'Crabshell Ring',
		effect: { defense: 5 }
	}
};
