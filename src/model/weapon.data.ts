// weapon type from below

import type { Weapon, WeaponBase, WeaponType } from './weapon';

const swords: WeaponBase[] = [
	{
		name: 'Rusty Sword',
		level: 1,
		damage: [2, 5],
		critStrikeChance: 0.02
	},
	{
		name: 'Steel Smallsword',
		level: 1,
		damage: [4, 8],
		critStrikeChance: 0.02,
		stats: {
			speed: 2
		}
	},
	{
		name: 'Wooden Blade',
		level: 1,
		damage: [3, 7],
		critStrikeChance: 0.02
	},
	{
		name: "Pirate's Sword",
		level: 2,
		damage: [8, 14],
		critStrikeChance: 0.02,
		stats: {
			speed: 2
		}
	},
	{
		name: 'Silver Saber',
		level: 2,
		damage: [8, 15],
		critStrikeChance: 0.02,
		stats: {
			defense: 1
		}
	},
	{
		name: 'Cutlass',
		level: 3,
		damage: [9, 17],
		critStrikeChance: 0.02,
		stats: {
			speed: 2
		}
	},
	{
		name: 'Forest Sword',
		level: 3,
		damage: [8, 18],
		critStrikeChance: 0.02,
		stats: {
			speed: 2,
			defense: 1
		}
	},
	{
		name: 'Iron Edge',
		level: 3,
		damage: [12, 25],
		critStrikeChance: 0.02,
		stats: {
			speed: -2,
			defense: 1,
			weight: 3
		}
	},
	{
		name: 'Insect Head',
		level: 6,
		damage: [20, 30],
		critStrikeChance: 0.04,
		stats: {
			speed: 2,
			critChance: 2
		}
	},
	{
		name: 'Bone Sword',
		level: 5,
		damage: [20, 30],
		critStrikeChance: 0.02,
		stats: {
			speed: 4,
			weight: 2
		}
	},
	{
		name: 'Claymore',
		level: 5,
		damage: [20, 32],
		critStrikeChance: 0.02,
		stats: {
			speed: -4,
			defense: 2,
			weight: 3
		}
	},
	{
		name: "Neptune's Glaive",
		level: 5,
		damage: [18, 35],
		critStrikeChance: 0.02,
		stats: {
			speed: -1,
			defense: 2,
			weight: 4
		}
	},
	{
		name: "Templar's Blade",
		level: 5,
		damage: [22, 29],
		critStrikeChance: 0,
		stats: {
			defense: 1
		}
	},
	{
		name: 'Obsidian Edge',
		level: 6,
		damage: [30, 45],
		critStrikeChance: 0.02,
		stats: {
			speed: -1,
			critPower: 10
		}
	},
	{
		name: 'Ossified Blade',
		level: 6,
		damage: [26, 42],
		critStrikeChance: 0.02,
		stats: {
			speed: -2,
			defense: 1,
			weight: 2
		}
	},
	{
		name: 'Holy Blade',
		level: 7,
		damage: [20, 27],
		critStrikeChance: 0.02,
		stats: {
			speed: 4,
			defense: 2
		}
	},
	{
		name: 'Tempered Broadsword',
		level: 7,
		damage: [29, 44],
		critStrikeChance: 0.02,
		stats: {
			speed: -3,
			defense: 3,
			weight: 3
		}
	},
	{
		name: 'Yeti Tooth',
		level: 7,
		damage: [26, 42],
		critStrikeChance: 0.02,
		stats: {
			critPower: 10,
			defense: 4
		}
	},
	{
		name: 'Steel Falchion',
		level: 8,
		damage: [28, 46],
		critStrikeChance: 0.02,
		stats: {
			speed: 4,
			critPower: 20
		}
	},
	{
		name: 'Dark Sword',
		level: 9,
		damage: [30, 45],
		critStrikeChance: 0.04,
		stats: {
			speed: -5,
			critChance: 2,
			weight: 5
		}
	},
	{
		name: 'Lava Katana',
		level: 10,
		damage: [55, 64],
		critStrikeChance: 0.015,
		stats: {
			defense: 3,
			weight: 3
		}
	},
	{
		name: 'Dragontooth Cutlass',
		level: 13,
		damage: [75, 90],
		critStrikeChance: 0.02,
		stats: {
			critPower: 50
		}
	},
	{
		name: 'Dwarf Sword',
		level: 13,
		damage: [65, 75],
		critStrikeChance: 0.02,
		stats: {
			speed: 2,
			defense: 4
		}
	},
	{
		name: 'Galaxy Sword',
		level: 13,
		damage: [60, 80],
		critStrikeChance: 0.02,
		stats: {
			speed: 4
		}
	},
	{
		name: 'Infinity Blade',
		level: 17,
		damage: [80, 100],
		critStrikeChance: 0.02,
		stats: {
			speed: 4,
			defense: 2
		}
	},
	{
		name: "Haley's Iron",
		level: 6,
		damage: [30, 45],
		critStrikeChance: 0.02,
		stats: {
			speed: -1,
			critPower: 10
		}
	},
	{
		name: "Leah's Whittler",
		level: 6,
		damage: [30, 45],
		critStrikeChance: 0.02,
		stats: {
			speed: -1,
			critPower: 10
		}
	},
	{
		name: 'Meowmere',
		level: 4,
		damage: [20, 20],
		critStrikeChance: 0.02,
		stats: {
			speed: 4,

			weight: 2
		}
	}
];

export const daggers: WeaponBase[] = [
	{
		name: 'Carving Knife',
		level: 1,
		damage: [1, 3],
		critStrikeChance: 0.04
	},
	{
		name: 'Iron Dirk',
		level: 1,
		damage: [2, 4],
		critStrikeChance: 0.03,
		stats: {
			critChance: 2
		}
	},
	{
		name: 'Wind Spire',
		level: 1,
		damage: [1, 5],
		critStrikeChance: 0.02,
		stats: {
			critPower: 10,
			critChance: 1,

			weight: 5
		}
	},
	{
		name: 'Elf Blade',
		level: 2,
		damage: [3, 5],
		critStrikeChance: 0.04,
		stats: {
			critChance: 2
		}
	},
	{
		name: "Burglar's Shank",
		level: 4,
		damage: [7, 12],
		critStrikeChance: 0.04,
		stats: {
			critPower: 25,
			critChance: 2
		}
	},
	{
		name: 'Crystal Dagger',
		level: 4,
		damage: [4, 10],
		critStrikeChance: 0.03,
		stats: {
			critPower: 50,
			critChance: 2,

			weight: 5
		}
	},
	{
		name: 'Shadow Dagger',
		level: 4,
		damage: [10, 20],
		critStrikeChance: 0.04,
		stats: {
			critChance: 2
		}
	},
	{
		name: 'Broken Trident',
		level: 5,
		damage: [15, 26],
		critStrikeChance: 0.02,
		stats: {
			critChance: 1
		}
	},
	{
		name: 'Wicked Kris',
		level: 8,
		damage: [24, 30],
		critStrikeChance: 0.06,
		stats: {
			critChance: 4
		}
	},
	{
		name: 'Galaxy Dagger',
		level: 8,
		damage: [30, 40],
		critStrikeChance: 0.02,
		stats: {
			speed: 1,
			critChance: 1,
			weight: 5
		}
	},
	{
		name: 'Dwarf Dagger',
		level: 11,
		damage: [32, 38],
		critStrikeChance: 0.03,
		stats: {
			speed: 1,

			critChance: 2,
			defense: 6,
			weight: 5
		}
	},
	{
		name: 'Dragontooth Shiv',
		level: 12,
		damage: [40, 50],
		critStrikeChance: 0.05,
		stats: {
			critPower: 100,
			critChance: 3,

			weight: 5
		}
	},
	{
		name: 'Iridium Needle',
		level: 12,
		damage: [20, 35],
		critStrikeChance: 0.1,
		stats: {
			critPower: 200,
			critChance: 6
		}
	},
	{
		name: 'Infinity Dagger',
		level: 16,
		damage: [50, 70],
		critStrikeChance: 0.06,
		stats: {
			speed: 1,
			critChance: 4,
			defense: 3,
			weight: 5
		}
	},
	{
		name: "Elliott's Pencil",
		level: 8,
		damage: [24, 30],
		critStrikeChance: 0.06,
		stats: {
			critChance: 4
		}
	},
	{
		name: "Abby's Planchette",
		level: 8,
		damage: [24, 30],
		critStrikeChance: 0.06,
		stats: {
			critChance: 4
		}
	}
];

export const maces: WeaponBase[] = [
	{
		name: 'Femur',
		level: 2,
		damage: [6, 11],
		critStrikeChance: 0.02
	},
	{
		name: 'Wood Club',
		level: 2,
		damage: [9, 16],
		critStrikeChance: 0.02,
		stats: {
			speed: 2
		}
	},
	{
		name: 'Wood Mallet',
		level: 3,
		damage: [15, 24],
		critStrikeChance: 0.02,
		stats: {
			speed: 2,

			weight: 2
		}
	},
	{
		name: 'Lead Rod',
		level: 4,
		damage: [18, 27],
		critStrikeChance: 0.02,
		stats: {
			speed: 4
		}
	},
	{
		name: 'Kudgel',
		level: 5,
		damage: [27, 40],
		critStrikeChance: 0.02,
		stats: {
			speed: 1,
			critPower: 50,

			weight: 2
		}
	},
	{
		name: 'The Slammer',
		level: 7,
		damage: [40, 55],
		critStrikeChance: 0.02,
		stats: {
			speed: 2
		}
	},
	{
		name: 'Galaxy Hammer',
		level: 12,
		damage: [70, 90],
		critStrikeChance: 0.02,
		stats: {
			speed: 2,

			weight: 5
		}
	},
	{
		name: 'Dwarf Hammer',
		level: 13,
		damage: [75, 85],
		critStrikeChance: 0.02,
		stats: {
			defense: 2,
			weight: 5
		}
	},
	{
		name: 'Dragontooth Club',
		level: 14,
		damage: [80, 100],
		critStrikeChance: 0.02,
		stats: {
			critPower: 50,

			weight: 3
		}
	},
	{
		name: 'Infinity Gavel',
		level: 17,
		damage: [100, 120],
		critStrikeChance: 0.02,
		stats: {
			speed: 2,

			defense: 1,
			weight: 5
		}
	},
	{
		name: "Alex's Bat",
		level: 7,
		damage: [40, 55],
		critStrikeChance: 0.02,
		stats: {
			speed: 2
		}
	},
	{
		name: "Harvey's Mallet",
		level: 7,
		damage: [40, 55],
		critStrikeChance: 0.02,
		stats: {
			speed: -2
		}
	},
	{
		name: "Maru's Wrench",
		level: 7,
		damage: [40, 55],
		critStrikeChance: 0.02,
		stats: {
			speed: -2
		}
	},
	{
		name: "Penny's Fryer",
		level: 7,
		damage: [40, 55],
		critStrikeChance: 0.02,
		stats: {
			speed: -2
		}
	},
	{
		name: "Sam's Old Guitar",
		level: 7,
		damage: [40, 55],
		critStrikeChance: 0.02,
		stats: {
			speed: -2
		}
	},
	{
		name: "Seb's Lost Mace",
		level: 7,
		damage: [40, 55],
		critStrikeChance: 0.02,
		stats: {
			speed: -2
		}
	}
];

function withWeaponType(arr: WeaponBase[], type: WeaponType) {
	return arr.map((w) => ({ ...w, type }));
}

export const weapons: Weapon[] = [
	...withWeaponType(swords, 'sword'),
	...withWeaponType(daggers, 'dagger'),
	...withWeaponType(maces, 'mace')
];
