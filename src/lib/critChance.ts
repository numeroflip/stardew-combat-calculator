/**
 * base damage × (3 + Crit. Power / 50)
 */

import type { GemName } from '../model/gem';
import type { CombatProfession } from '../model/profession';
import type { Ring } from '../model/ring';
import type { Weapon } from '../model/weapon';

type Args = {
	weapon: Weapon; // Weapon's base chance
	gems?: GemName[];
	rings?: Ring[];
	blessingOfFangs?: boolean;
	profession?: CombatProfession;
	luck: number;
};

export function getCritChance({
	weapon,
	gems,
	rings,
	luck = 0,
	profession,
	blessingOfFangs
}: Args) {
	let critChance = weapon.critStrikeChance;

	if (gems) {
		// Gems
		gems.forEach((gem) => {
			if (gem === 'aquamarine') {
				critChance += 0.046;
			}
		});
	}

	// Dagger
	if (weapon.type === 'dagger') {
		critChance = (critChance + 0.005) * 1.12;
	}

	// Ring
	if (rings) {
		let ringCritChance = 0;

		rings.forEach((ring) => {
			if (ring?.effect?.critChance) {
				ringCritChance += ring.effect.critChance;
			}
		});
		critChance = critChance * (1 + ringCritChance);
	}

	if (blessingOfFangs) {
		critChance += 0.1;
	}

	if (profession?.line === 'scout') {
		critChance = critChance * 1.5;
	}

	critChance += (luck * critChance) / 40;

	return critChance;
}
