import { innateEnchantments, type SelectedEnchantment } from '../model/enchantment';
import type { GemName } from '../model/gem';
import {
	BRUTE_DMG_MULTIPLIER,
	FIGHTER_DMG_MULTIPLIER,
	type SelectedProfession
} from '../model/profession';
import type { Ring } from '../model/ring';
import type { Weapon } from '../model/weapon';
import { formatNumber } from './formatNumber';

const DMG_PER_ATTACK_POINT = 3;

type Options = {
	gems?: GemName[];
	rings?: Ring[];
	enchantment?: SelectedEnchantment;
	profession?: SelectedProfession;
	attackBuff?: number;
	critMultiplier?: number;
};

export function getDamageValues(
	weapon: Weapon,
	{
		gems = [],
		rings = [],
		enchantment = undefined,
		profession = undefined,
		attackBuff,
		critMultiplier
	}: Options = {}
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
	if (profession?.lvl5 === 'fighter') {
		multiplier += FIGHTER_DMG_MULTIPLIER;
	}

	if (profession?.lvl10 === 'brute') {
		multiplier += BRUTE_DMG_MULTIPLIER;
	}

	// Enchantment
	if (enchantment && enchantment.key === 'attack') {
		const foundEnchantment = innateEnchantments.guaranteed[enchantment.key].options.find(
			(option) => option.name === enchantment.optionName
		);

		if (foundEnchantment) {
			extraDamage += foundEnchantment.value;
		} else {
			console.error("Enchantment's value is invalid");
		}
	}

	if (attackBuff) {
		extraDamage += attackBuff * DMG_PER_ATTACK_POINT;
	}

	const min = baseDamage[0] * multiplier;
	const max = baseDamage[1] * multiplier;

	const minCrit = min * (critMultiplier || 1);
	const maxCrit = max * (critMultiplier || 1);

	return {
		min: formatNumber(min + extraDamage),
		max: formatNumber(max + extraDamage),
		minCrit: formatNumber(minCrit + extraDamage),
		maxCrit: formatNumber(maxCrit + extraDamage)
	};
}
