import { innateEnchantment, type GuaranteedInnateEnchantment } from '../model/enchantment';
import type { GemName } from '../model/gem';
import type { CombatProfession } from '../model/profession';
import type { Ring } from '../model/ring';
import type { Weapon } from '../model/weapon';

type Options = {
	gems?: GemName[];
	rings?: Ring[];
	profession?: CombatProfession;
	enchantment?: { name: GuaranteedInnateEnchantment; value: number };
};

export function getCritMultiplier(
	weapon: Weapon,
	{ gems = [], rings = [], profession = undefined, enchantment = undefined }: Options = {}
) {
	let critPower = weapon.stats?.critPower ?? 0;
	let multiplier = 1;

	// Gems
	gems.forEach((gem) => {
		if (gem === 'jade') {
			critPower += 5;
		}
	});

	// Rings
	rings.forEach((ring) => {
		if (ring?.effect?.critMultiplier) {
			multiplier += ring.effect.critMultiplier;
		}
	});

	// Enchantment
	if (enchantment?.name === 'critPower') {
		const foundEnchantment = innateEnchantment.guaranteed[enchantment.name].options.find(
			(option) => option.name === enchantment.value
		);

		if (foundEnchantment) {
			multiplier += foundEnchantment.value;
		} else {
			console.error("Enchantment's value is invalid");
		}
	}

	// Profession
	if (profession?.specialization === 'desperado') {
		multiplier *= 2;
	}

	return (3 + critPower / 50) * multiplier;
}
