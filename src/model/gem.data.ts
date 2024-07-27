import type { GemName } from './gem';
import type { Stats } from './weapon';

export const gems: Record<GemName, { stats: [Stats, Stats, Stats] }> = {
	emerald: {
		stats: [
			{
				speed: 2
			},
			{ speed: 2 },
			{ speed: 3 }
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
