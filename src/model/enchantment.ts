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
			options: [nameAndValue(25, 0.5), nameAndValue(50, 1), nameAndValue(75, 1.5)]
		},
		critChance: {
			options: [nameAndValue(1, 0.02), nameAndValue(2, 0.04), nameAndValue(3, 0.06)]
		},
		attack: {
			options: [
				nameAndValue(1, 3),
				nameAndValue(2, 6),
				nameAndValue(3, 9),
				nameAndValue(4, 12),
				nameAndValue(5, 15)
			] as const
		},
		speed: {
			options: [
				nameAndValue(1, 0.01),
				nameAndValue(2, 0.02),
				nameAndValue(3, 0.03),
				nameAndValue(4, 0.04)
			]
		}
	}
} as const;

export type SelectedEnchantment = { name: GuaranteedInnateEnchantment; value: number };

function nameAndValue(name: number, value: number) {
	return { name, value };
}

export type GuaranteedInnateEnchantment = keyof (typeof innateEnchantment)['guaranteed'];

export type InnateEnchantment<T extends GuaranteedInnateEnchantment> = {
	name: T;
	option: (typeof innateEnchantment)['guaranteed'][T]['options'][number];
};
