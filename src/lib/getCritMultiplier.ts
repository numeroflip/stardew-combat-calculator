import { innateEnchantments, type SelectedEnchantment } from '../model/enchantment';
import type { GemName } from '../model/gem';
import type { SelectedProfession } from '../model/profession';
import type { Ring } from '../model/ring';
import type { Weapon } from '../model/weapon';

type Options = {
	gems?: GemName[];
	rings?: Ring[];
	profession?: SelectedProfession;
	enchantment?: SelectedEnchantment;
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
	if (enchantment?.key === 'critPower') {
		const foundEnchantment = innateEnchantments.guaranteed[enchantment.key].options.find(
			(option) => option.name === enchantment.optionName
		);

		if (foundEnchantment) {
			multiplier += foundEnchantment.value;
		} else {
			console.error("Enchantment's value is invalid");
		}
	}

	// Profession
	if (profession?.lvl10 === 'desperado') {
		multiplier *= 2;
	}

	return calculateMultiplier(critPower, multiplier);
}

export function getBaseCritMultiplier(weapon: Weapon) {
	const critPower = weapon.stats?.critPower ?? 0;
	return calculateMultiplier(critPower);
}

function calculateMultiplier(critPower: number, multiplier = 1) {
	return (3 + critPower / 50) * multiplier;
}
