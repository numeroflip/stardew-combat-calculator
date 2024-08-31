import type { CalculatorOptions } from '$model/calculatorOptions';
import { innateEnchantments } from '$model/enchantment';
import { gemData } from '$model/gem.data';
import { ringsData } from '$model/ring.data';
import type { Weapon } from '$model/weapon';
import { weapons } from '$model/weapon.data';

const MILLISECOND_PER_SPEED_POINT = 40;
const BASE_SPEED_BY_WEAPON_TYPE: Record<Weapon['type'], number> = {
	club: 720,
	sword: 400,
	dagger: 125 // 8 click per second. The game migh allow quicker, but it's a sensible default, as it's hard to click much quicker
};

export const ABSOLUTE_MIN_WEAPON_SPEED_IN_MILLISECONDS = BASE_SPEED_BY_WEAPON_TYPE.dagger;

export const getEffectiveSpeedLimit = (weapon: Weapon) => {
	if (weapon.type === 'dagger') {
		return BASE_SPEED_BY_WEAPON_TYPE.dagger;
	}
	return BASE_SPEED_BY_WEAPON_TYPE.sword - 4 * MILLISECOND_PER_SPEED_POINT;
};

function speedLvlToMilliseconds(lvl: number) {
	return lvl * 40;
}

export function getSpeedValues(options: CalculatorOptions): number {
	const weapon = weapons.find((w) => w.name === options.weapon);

	if (!weapon) {
		return 0;
	}

	if (weapon.type === 'dagger') {
		return 125;
	}

	const baseSpeed = BASE_SPEED_BY_WEAPON_TYPE[weapon.type];

	const speedFromWeaponStats = speedLvlToMilliseconds(weapon.stats?.speed ?? 0);

	const uniqueGems = Array.from(new Set(options.gems || [])).filter(Boolean);

	const gemEnchantmentSpeedEffectsArr = uniqueGems
		.map((gem) => {
			const data = gemData[gem];
			const level = options.gems?.filter((_gem) => _gem === gem).length;
			if (!level) {
				return;
			}

			let speedAdditions = 0;

			data.stats.forEach((stat, index) => {
				if (index > level - 1) {
					return;
				}
				if (stat.speed) {
					speedAdditions += stat.speed;
				}
			});
			return speedLvlToMilliseconds(speedAdditions);
		})
		.filter(Boolean);

	const speedFromGems = gemEnchantmentSpeedEffectsArr.reduce((a, b) => a + b, 0);

	const secondaryEnchantmentSpeed =
		options.enchantment?.key === 'speed'
			? innateEnchantments.guaranteed.speed.options.find(
					(option) => option.name === options.enchantment?.optionName
				)?.value || 0
			: 0;

	const speedRingEffects = [...(options.rings?.left || []), ...(options.rings?.right || [])]
		.map((ring) => {
			if (!ring) {
				return;
			}
			const data = ringsData[ring];
			return data.effect.speed;
		})
		.filter(Boolean)
		.reduce((a, b) => a + b, 0);

	const speedFromBlessing = options.blessing === 'speed' ? speedLvlToMilliseconds(0.5) : 0;
	const speedFromFood = options.speedFromFood ? speedLvlToMilliseconds(options.speedFromFood) : 0;
	const multiplier = 1 - (speedRingEffects + secondaryEnchantmentSpeed);
	const result =
		(baseSpeed - speedFromWeaponStats - speedFromBlessing - speedFromGems - speedFromFood) *
		multiplier;
	return Math.max(getEffectiveSpeedLimit(weapon), result);
}

export function weaponBaseSpeed(weapon: Weapon) {
	const extraWeaponSpeed = speedLvlToMilliseconds(weapon.stats?.speed ?? 0);
	return BASE_SPEED_BY_WEAPON_TYPE[weapon.type] - extraWeaponSpeed;
}
