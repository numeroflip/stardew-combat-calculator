import { expect, test } from 'vitest';
import { getCritChance } from './getCritChance';
import { weapons } from '../model/weapon.data';
import { rings } from '../model/ring.data';

// Values based on https://stardewvalleywiki.com/Combat#Critical_hit_chance

function round(n: number) {
	return Math.round(n * 10000) / 10000;
}

const galaxySword = weapons.find((weapon) => weapon.name === 'Galaxy Sword');
if (!galaxySword) {
	throw new Error('Galaxy Sword not found');
}
const galaxyDagger = weapons.find((weapon) => weapon.name === 'Galaxy Dagger');
if (!galaxyDagger) {
	throw new Error('Galaxy Dagger not found');
}

test('galaxySword basic Crit chance is 2%', () => {
	expect(getCritChance(galaxySword)).toBe(0.02);
});

test('galaxySword + 3 aquamarine gem is Crit chance is 15.8%', () => {
	expect(
		getCritChance(galaxySword, {
			gems: ['aquamarine', 'aquamarine', 'aquamarine']
		})
	).toBe(0.158);
});

test('galaxySword + 1 ring + 3 aquamarine', () => {
	expect(
		getCritChance(galaxySword, {
			rings: [rings.aquamarine],
			gems: ['aquamarine', 'aquamarine', 'aquamarine']
		})
	).toBe(0.1738);
});

test('galaxySword + 1 ring + 3 aquamarine', () => {
	expect(
		getCritChance(galaxySword, {
			rings: [rings.aquamarine, rings.aquamarine],
			gems: ['aquamarine', 'aquamarine', 'aquamarine']
		})
	).toBe(0.1896);
});

test('galaxySword + 1 ring + 3 aquamarine + best enchantment', () => {
	expect(
		getCritChance(galaxySword, {
			rings: [rings.aquamarine, rings.aquamarine],
			gems: ['aquamarine', 'aquamarine', 'aquamarine'],
			enchantment: { key: 'critChance', optionName: '3' }
		})
	).toBe(0.19908);
});

test('galaxySword + 2 ring + 3 aquamarine', () => {
	expect(
		getCritChance(galaxySword, {
			rings: [rings.aquamarine, rings.aquamarine],
			gems: ['aquamarine', 'aquamarine', 'aquamarine']
		})
	).toBe(0.1896);
});

test('galaxySword + 2 ring + 3 aquamarine + blessing of Fangs', () => {
	const chance = getCritChance(galaxySword, {
		rings: [rings.aquamarine, rings.aquamarine],
		gems: ['aquamarine', 'aquamarine', 'aquamarine'],
		hasBlessingOfFangs: true
	});
	expect(round(chance)).toBe(0.2896);
});

test('galaxySword + 2 ring + 3 aquamarine + blessing of Fangs + Scout', () => {
	const chance = getCritChance(galaxySword, {
		rings: [rings.aquamarine, rings.aquamarine],
		gems: ['aquamarine', 'aquamarine', 'aquamarine'],
		hasBlessingOfFangs: true,
		profession: { lvl5: 'scout' }
	});
	expect(round(chance)).toBe(0.4344);
});

test('galaxySword + 2 ring + 3 aquamarine + blessing of Fangs + Scout + Luck', () => {
	const chance = getCritChance(galaxySword, {
		rings: [rings.aquamarine, rings.aquamarine],
		gems: ['aquamarine', 'aquamarine', 'aquamarine'],
		hasBlessingOfFangs: true,
		profession: { lvl5: 'scout' },
		luck: 2
	});
	expect(round(chance)).toBe(0.4344 + 0.0217);
});
