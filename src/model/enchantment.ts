import type { Weapon } from './weapon';

export const innateEnchantment = {
	optional: {
		def: {
			options: [1, 2],
			isAllowed: (w: Weapon) => w.level < 10
		},
		weight: {
			options: [-0.1, -0.2, -0.3, -0.4, -0.5]
		}
	},
	guaranteed: {
		critPower: {
			options: [25, 50, 75]
		},
		critChance: {
			options: [0.02, 0.04, 0.06]
		},
		attack: {
			options: [3, 6, 9, 12, 15]
		},
		speed: {
			options: [0.1, 0.2, 0.3, 0.4]
		}
	}
};
