import { expect, test } from 'vitest';
import { weapons } from '../model/weapon.data';
import { getCritMultiplier } from './getCritMultiplier';
import { rings } from '../model/ring.data';

// Values based on https://stardewvalleywiki.com/Crit._Power

const galaxySword = weapons.find((weapon) => weapon.name === 'Galaxy Sword');
if (!galaxySword) {
	throw new Error('Galaxy Sword not found');
}
const lavaKatana = weapons.find((weapon) => weapon.name === 'Lava Katana');
if (!lavaKatana) {
	throw new Error('Galaxy Dagger not found');
}

const BASE_CRIT_MULTIPLIER = 3;

test('galaxySword Crit Multiplier is 3', () => {
	expect(getCritMultiplier(galaxySword)).toBe(BASE_CRIT_MULTIPLIER);
});

test("Lava Katana's Crit Multiplier is 3.5", () => {
	expect(getCritMultiplier(lavaKatana)).toBe(BASE_CRIT_MULTIPLIER + 0.5);
});

test("Lava Katana's  + 3 gem", () => {
	expect(getCritMultiplier(lavaKatana, { gems: ['jade', 'jade', 'jade'] })).toBe(3.8);
});

test("Lava Katana's  + 3 gem + 2 ring + enchantment", () => {
	expect(
		getCritMultiplier(lavaKatana, {
			gems: ['jade', 'jade', 'jade'],
			rings: [rings.jade, rings.jade],
			enchantment: { name: 'critPower', value: 75 }
		})
	).toBe(10.26);
});

test("Lava Katana's  + 3 gem + 2 ring + enchantment + desperado", () => {
	expect(
		getCritMultiplier(lavaKatana, {
			gems: ['jade', 'jade', 'jade'],
			rings: [rings.jade, rings.jade],
			profession: { line: 'scout', specialization: 'desperado' },
			enchantment: { name: 'critPower', value: 75 }
		})
	).toBe(20.52);
});
