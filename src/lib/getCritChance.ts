/**
 * base damage × (3 + Crit. Power / 50)
 */

import { innateEnchantment, type SelectedEnchantment } from '../model/enchantment';
import type { GemName } from '../model/gem';
import type { CombatProfession } from '../model/profession';
import type { Ring } from '../model/ring';
import type { Weapon } from '../model/weapon';

type Options = {
	gems?: GemName[];
	rings?: Ring[];
	blessingOfFangs?: boolean;
	profession?: CombatProfession;
	enchantment?: SelectedEnchantment;
	luck?: number;
};

export function getCritChance(
	weapon: Weapon,
	{
		gems = [],
		rings = [],
		luck = 0,
		profession = undefined,
		enchantment = undefined,
		blessingOfFangs = false
	}: Options = {}
) {
	let critChance = weapon.critStrikeChance;

	// Gems
	gems.forEach((gem) => {
		if (gem === 'aquamarine') {
			critChance += 0.046;
		}
	});

	// Dagger
	if (weapon.type === 'dagger') {
		critChance = (critChance + 0.005) * 1.12;
	}

	// Ring
	let ringCritChance = 0;
	rings.forEach((ring) => {
		if (ring?.effect?.critChance) {
			ringCritChance += ring.effect.critChance;
		}
	});

	// Enchantment
	const enchantmentCritChance = getEnchantmentCritChance(enchantment);
	critChance = critChance * (1 + (enchantmentCritChance + ringCritChance));

	// Blessing of Fangs
	if (blessingOfFangs) {
		critChance += 0.1;
	}

	// Professions
	if (profession?.line === 'scout') {
		critChance = critChance * 1.5;
	}

	// Luck
	critChance += (luck * critChance) / 40;
	return critChance;
}

function getEnchantmentCritChance(enchantment?: SelectedEnchantment) {
	if (!enchantment) {
		return 0;
	}

	if (enchantment.name === 'critChance') {
		const foundEnchantment = innateEnchantment.guaranteed[enchantment.name].options.find(
			(option) => option.name === enchantment.value
		);
		return foundEnchantment?.value ?? 0;
	}
	return 0;
}
