import { expect, test } from 'vitest';
import { weapons } from '../model/weapon.data';

import { getDamageValues } from './getDamageValues';
import { BRUTE_DMG_MULTIPLIER, FIGHTER_DMG_MULTIPLIER } from '../model/profession';
import { rings } from '../model/ring.data';

const galaxySword = weapons.find((weapon) => weapon.name === 'Galaxy Sword');
if (!galaxySword) {
	throw new Error('Galaxy Sword not found');
}

test('base damage is correct', () => {
	expect(getDamageValues(galaxySword)[0]).toBe(60);
});

test('profession perks are applied correctly', () => {
	expect(getDamageValues(galaxySword, { profession: { lvl5: 'fighter', lvl10: 'brute' } })[0]).toBe(
		60 * (1 + (FIGHTER_DMG_MULTIPLIER + BRUTE_DMG_MULTIPLIER))
	);
});

test('ring perks are applied correctly', () => {
	expect(getDamageValues(galaxySword, { rings: [rings.ruby, rings.ruby] })[0]).toBe(60 * 1.2);
});

test('gem perks are applied correctly', () => {
	expect(
		getDamageValues(galaxySword, {
			rings: [rings.ruby, rings.ruby],
			gems: ['ruby', 'ruby', 'ruby']
		})[0]
	).toBe(60 * (1 + 0.2 + 0.3));
});

test('ring perks are applied correctly', () => {
	const attackEnchValue = '3';
	expect(
		getDamageValues(galaxySword, {
			enchantment: { key: 'attack', optionName: attackEnchValue }
		})[0]
	).toBe(60 + Number(attackEnchValue) * 3);
});
