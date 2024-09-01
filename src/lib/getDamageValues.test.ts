import { expect, test } from 'vitest';
import { weapons } from '../model/weapon.data';

import { getDamageValues } from './getDamageValues';
import { BRUTE_DMG_MULTIPLIER, FIGHTER_DMG_MULTIPLIER } from '../model/profession';
import { ringsData } from '../model/ring.data';

const galaxySword = weapons.find((weapon) => weapon.name === 'Galaxy Sword');

const MIN_DMG_GALAXY_SWORD = 60;

if (!galaxySword) {
	throw new Error('Galaxy Sword not found');
}

test('base damage is correct', () => {
	expect(getDamageValues(galaxySword).min).toBe(MIN_DMG_GALAXY_SWORD);
});

test('profession perks are applied correctly', () => {
	expect(
		getDamageValues(galaxySword, { profession: { lvl5: 'fighter', lvl10: 'brute' } }).min
	).toBe(MIN_DMG_GALAXY_SWORD * (1 + (FIGHTER_DMG_MULTIPLIER + BRUTE_DMG_MULTIPLIER)));
});

test('ring perks are applied correctly', () => {
	expect(getDamageValues(galaxySword, { rings: [ringsData.ruby, ringsData.ruby] }).min).toBe(
		MIN_DMG_GALAXY_SWORD * 1.2
	);
});

test('gem perks are applied correctly', () => {
	expect(
		getDamageValues(galaxySword, {
			rings: [ringsData.ruby, ringsData.ruby],
			gems: ['ruby', 'ruby', 'ruby']
		}).min
	).toBe(MIN_DMG_GALAXY_SWORD * (1 + 0.2 + 0.3));
});

test('ring perks are applied correctly', () => {
	const attackEnchValue = '3';
	expect(
		getDamageValues(galaxySword, {
			enchantment: { key: 'attack', optionName: attackEnchValue }
		}).min
	).toBe(MIN_DMG_GALAXY_SWORD + Number(attackEnchValue) * 3);
});

test('Extra attack points are applied correctly to base dmg', () => {
	const attackBuff = 3;
	expect(
		getDamageValues(galaxySword, {
			attackBuff: attackBuff
		}).min
	).toBe(MIN_DMG_GALAXY_SWORD + attackBuff * 3);
});

test('Extra attack points are applied correctly to crit dmg', () => {
	const attackBuff = 3;
	const critMultiplier = 4;

	const expecTedBaseCrit = MIN_DMG_GALAXY_SWORD * critMultiplier;
	const expectedExtraDmg = attackBuff * 3;

	expect(
		getDamageValues(galaxySword, {
			attackBuff: attackBuff,
			critMultiplier: 4
		}).minCrit
	).toBe(expecTedBaseCrit + expectedExtraDmg);
});
