import { innateEnchantment, type GuaranteedInnateEnchantment } from '../model/enchantment';
import type { GemName } from '../model/gem';
import {
	BRUTE_DMG_MULTIPLIER,
	FIGHTER_DMG_MULTIPLIER,
	type CombatProfession
} from '../model/profession';
import type { Ring } from '../model/ring';
import type { Weapon } from '../model/weapon';
import { round } from './utils';

type Options = {
	gems?: GemName[];
	rings?: Ring[];
	enchantment?: { name: GuaranteedInnateEnchantment; value: number };
	profession?: CombatProfession;
};

export function getDamageValues(
	weapon: Weapon,
	{ gems = [], rings = [], enchantment = undefined, profession = undefined }: Options = {}
) {
	const baseDamage = weapon.damage;
	let multiplier = 1;
	let extraDamage = 0;

	// Gems
	gems.forEach((gem) => {
		if (gem === 'ruby') {
			multiplier += 0.1;
		}
	});

	// Rings
	rings.forEach((ring) => {
		if (ring.effect?.damage) {
			multiplier += ring.effect.damage;
		}
	});

	// Profession
	if (profession?.line === 'fighter') {
		multiplier += FIGHTER_DMG_MULTIPLIER;
	}

	if (profession?.specialization === 'brute') {
		multiplier += BRUTE_DMG_MULTIPLIER;
	}

	// Enchantment
	if (enchantment && enchantment.name === 'attack') {
		const foundEnchantment = innateEnchantment.guaranteed[enchantment.name].options.find(
			(option) => option.name === enchantment.value
		);

		if (foundEnchantment) {
			extraDamage += foundEnchantment.value;
		} else {
			console.error("Enchantment's value is invalid");
		}
	}

	return [
		round(baseDamage[0] * multiplier + extraDamage),
		round(baseDamage[1] * multiplier + extraDamage)
	];
}
