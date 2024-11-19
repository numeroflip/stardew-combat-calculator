// weapon type from below

import type { Weapon, WeaponBase, WeaponType } from './weapon';

const swordsBase: WeaponBase[] = [
	{
		name: 'Rusty Sword',
		level: 1,
		damage: [2, 5],
		critStrikeChance: 0.02,
		icon: 'https://stardewvalleywiki.com/mediawiki/images/d/d7/Rusty_Sword.png'
	},
	{
		name: 'Steel Smallsword',
		level: 1,
		damage: [4, 8],
		critStrikeChance: 0.02,
		stats: {
			speed: 2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/d/da/Steel_Smallsword.png'
	},
	{
		name: 'Wooden Blade',
		level: 1,
		damage: [3, 7],
		critStrikeChance: 0.02,
		icon: 'https://stardewvalleywiki.com/mediawiki/images/0/06/Wooden_Blade.png'
	},
	{
		name: "Pirate's Sword",
		level: 2,
		damage: [8, 14],
		critStrikeChance: 0.02,
		stats: {
			speed: 2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/1/19/Pirate%27s_Sword.png'
	},
	{
		name: 'Silver Saber',
		level: 2,
		damage: [8, 15],
		critStrikeChance: 0.02,
		stats: {
			defense: 1
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/b/b0/Silver_Saber.png'
	},
	{
		name: 'Cutlass',
		level: 3,
		damage: [9, 17],
		critStrikeChance: 0.02,
		stats: {
			speed: 2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/1/1e/Cutlass.png'
	},
	{
		name: 'Forest Sword',
		level: 3,
		damage: [8, 18],
		critStrikeChance: 0.02,
		stats: {
			speed: 2,
			defense: 1
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/1/17/Forest_Sword.png'
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
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/3/3c/Iron_Edge.png'
	},
	{
		name: 'Insect Head',
		level: 6,
		damage: [20, 30],
		critStrikeChance: 0.04,
		stats: {
			speed: 2,
			critChance: 2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/3/35/Insect_Head.png'
	},
	{
		name: 'Bone Sword',
		level: 5,
		damage: [20, 30],
		critStrikeChance: 0.02,
		stats: {
			speed: 4,
			weight: 2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/2/29/Bone_Sword.png'
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
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/0/0c/Claymore.png'
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
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/2/26/Neptune%27s_Glaive.png'
	},
	{
		name: "Templar's Blade",
		level: 5,
		damage: [22, 29],
		critStrikeChance: 0,
		stats: {
			defense: 1
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/e/e4/Templar%27s_Blade.png'
	},
	{
		name: 'Obsidian Edge',
		level: 6,
		damage: [30, 45],
		critStrikeChance: 0.02,
		stats: {
			speed: -1,
			critPower: 10
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/7/73/Obsidian_Edge.png'
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
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/3/30/Ossified_Blade.png'
	},
	{
		name: 'Holy Blade',
		level: 7,
		damage: [20, 27],
		critStrikeChance: 0.02,
		stats: {
			speed: 4,
			defense: 2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/a/ab/Holy_Blade.png'
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
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/5/51/Tempered_Broadsword.png'
	},
	{
		name: 'Yeti Tooth',
		level: 7,
		damage: [26, 42],
		critStrikeChance: 0.02,
		stats: {
			critPower: 10,
			defense: 4
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/4/4d/Yeti_Tooth.png'
	},
	{
		name: 'Steel Falchion',
		level: 8,
		damage: [28, 46],
		critStrikeChance: 0.02,
		stats: {
			speed: 4,
			critPower: 20
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/e/ee/Steel_Falchion.png'
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
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/2/2e/Dark_Sword.png'
	},
	{
		name: 'Lava Katana',
		level: 10,
		damage: [55, 64],
		critStrikeChance: 0.015,
		stats: {
			defense: 3,
			weight: 3,
			critPower: 25
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/a/a0/Lava_Katana.png'
	},
	{
		name: 'Dragontooth Cutlass',
		level: 13,
		damage: [75, 90],
		critStrikeChance: 0.02,
		stats: {
			critPower: 50
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/e/e8/Dragontooth_Cutlass.png'
	},
	{
		name: 'Dwarf Sword',
		level: 13,
		damage: [65, 75],
		critStrikeChance: 0.02,
		stats: {
			speed: 2,
			defense: 4
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/3/38/Dwarf_Sword.png'
	},
	{
		name: 'Galaxy Sword',
		level: 13,
		damage: [60, 80],
		critStrikeChance: 0.02,
		stats: {
			speed: 4
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/4/44/Galaxy_Sword.png'
	},
	{
		name: 'Infinity Blade',
		level: 17,
		damage: [80, 100],
		critStrikeChance: 0.02,
		stats: {
			speed: 4,
			defense: 2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/4/40/Infinity_Blade.png'
	},
	{
		name: "Haley's Iron",
		level: 6,
		damage: [30, 45],
		critStrikeChance: 0.02,
		stats: {
			speed: -1,
			critPower: 10
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/6/66/Haley%27s_Iron.png'
	},
	{
		name: "Leah's Whittler",
		level: 6,
		damage: [30, 45],
		critStrikeChance: 0.02,
		stats: {
			speed: -1,
			critPower: 10
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/6/69/Leah%27s_Whittler.png'
	},
	{
		name: 'Meowmere',
		level: 4,
		damage: [20, 20],
		critStrikeChance: 0.02,
		stats: {
			speed: 4,
			weight: 2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/6/63/Meowmere.png'
	}
];

export const daggersBase: WeaponBase[] = [
	{
		name: 'Carving Knife',
		level: 1,
		damage: [1, 3],
		critStrikeChance: 0.04,
		icon: 'https://stardewvalleywiki.com/mediawiki/images/6/6d/Carving_Knife.png'
	},
	{
		name: 'Iron Dirk',
		level: 1,
		damage: [2, 4],
		critStrikeChance: 0.03,
		stats: {
			critChance: 2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/b/bb/Iron_Dirk.png'
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
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/0/00/Wind_Spire.png'
	},
	{
		name: 'Elf Blade',
		level: 2,
		damage: [3, 5],
		critStrikeChance: 0.04,
		stats: {
			critChance: 2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/f/f2/Elf_Blade.png'
	},
	{
		name: "Burglar's Shank",
		level: 4,
		damage: [7, 12],
		critStrikeChance: 0.04,
		stats: {
			critPower: 25,
			critChance: 2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/7/7c/Burglar%27s_Shank.png'
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
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/8/8a/Crystal_Dagger.png'
	},
	{
		name: 'Shadow Dagger',
		level: 4,
		damage: [10, 20],
		critStrikeChance: 0.04,
		stats: {
			critChance: 2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/4/47/Shadow_Dagger.png'
	},
	{
		name: 'Broken Trident',
		level: 5,
		damage: [15, 26],
		critStrikeChance: 0.02,
		stats: {
			critChance: 1
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/3/3f/Broken_Trident.png'
	},
	{
		name: 'Wicked Kris',
		level: 8,
		damage: [24, 30],
		critStrikeChance: 0.06,
		stats: {
			critChance: 4
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/9/94/Wicked_Kris.png'
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
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/6/68/Galaxy_Dagger.png'
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
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/9/99/Dwarf_Dagger.png'
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
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/9/95/Dragontooth_Shiv.png'
	},
	{
		name: 'Iridium Needle',
		level: 12,
		damage: [20, 35],
		critStrikeChance: 0.1,
		stats: {
			critPower: 200,
			critChance: 6
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/6/62/Iridium_Needle.png'
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
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/d/d6/Infinity_Dagger.png'
	},
	{
		name: "Elliott's Pencil",
		level: 8,
		damage: [24, 30],
		critStrikeChance: 0.06,
		stats: {
			critChance: 4
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/7/70/Elliott%27s_Pencil.png'
	},
	{
		name: "Abby's Planchette",
		level: 8,
		damage: [24, 30],
		critStrikeChance: 0.06,
		stats: {
			critChance: 4
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/7/72/Abby%27s_Planchette.png'
	}
];

export const clubsBase: WeaponBase[] = [
	{
		name: 'Femur',
		level: 2,
		damage: [6, 11],
		critStrikeChance: 0.02,
		icon: 'https://stardewvalleywiki.com/mediawiki/images/e/e4/Femur.png'
	},
	{
		name: 'Wood Club',
		level: 2,
		damage: [9, 16],
		critStrikeChance: 0.02,
		stats: {
			speed: 2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/5/51/Wood_Club.png'
	},
	{
		name: 'Wood Mallet',
		level: 3,
		damage: [15, 24],
		critStrikeChance: 0.02,
		stats: {
			speed: 2,

			weight: 2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/a/ac/Wood_Mallet.png'
	},
	{
		name: 'Lead Rod',
		level: 4,
		damage: [18, 27],
		critStrikeChance: 0.02,
		stats: {
			speed: -4
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/3/36/Lead_Rod.png'
	},
	{
		name: 'Kudgel',
		level: 5,
		damage: [27, 40],
		critStrikeChance: 0.02,
		stats: {
			speed: -1,
			critPower: 50,

			weight: 2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/e/e0/Kudgel.png'
	},
	{
		name: 'The Slammer',
		level: 7,
		damage: [40, 55],
		critStrikeChance: 0.02,
		stats: {
			speed: -2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/c/c7/The_Slammer.png'
	},
	{
		name: 'Galaxy Hammer',
		level: 12,
		damage: [70, 90],
		critStrikeChance: 0.02,
		stats: {
			speed: 2,

			weight: 5
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/8/8a/Galaxy_Hammer.png'
	},
	{
		name: 'Dwarf Hammer',
		level: 13,
		damage: [75, 85],
		critStrikeChance: 0.02,
		stats: {
			defense: 2,
			weight: 5
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/d/d5/Dwarf_Hammer.png'
	},
	{
		name: 'Dragontooth Club',
		level: 14,
		damage: [80, 100],
		critStrikeChance: 0.02,
		stats: {
			critPower: 50,

			weight: 3
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/1/18/Dragontooth_Club.png'
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
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/8/87/Infinity_Gavel.png'
	},
	{
		name: "Alex's Bat",
		level: 7,
		damage: [40, 55],
		critStrikeChance: 0.02,
		stats: {
			speed: 2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/1/17/Alex%27s_Bat.png'
	},
	{
		name: "Harvey's Mallet",
		level: 7,
		damage: [40, 55],
		critStrikeChance: 0.02,
		stats: {
			speed: -2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/0/09/Harvey%27s_Mallet.png'
	},
	{
		name: "Maru's Wrench",
		level: 7,
		damage: [40, 55],
		critStrikeChance: 0.02,
		stats: {
			speed: -2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/6/6f/Maru%27s_Wrench.png'
	},
	{
		name: "Penny's Fryer",
		level: 7,
		damage: [40, 55],
		critStrikeChance: 0.02,
		stats: {
			speed: -2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/9/9c/Penny%27s_Fryer.png'
	},
	{
		name: "Sam's Old Guitar",
		level: 7,
		damage: [40, 55],
		critStrikeChance: 0.02,
		stats: {
			speed: -2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/d/dc/Sam%27s_Old_Guitar.png'
	},
	{
		name: "Seb's Lost Mace",
		level: 7,
		damage: [40, 55],
		critStrikeChance: 0.02,
		stats: {
			speed: -2
		},
		icon: 'https://stardewvalleywiki.com/mediawiki/images/3/37/Seb%27s_Lost_Mace.png'
	}
];

export const swords = withWeaponType(swordsBase, 'sword');
export const daggers = withWeaponType(daggersBase, 'dagger');
export const clubs = withWeaponType(clubsBase, 'club');

function withWeaponType(arr: WeaponBase[], type: WeaponType) {
	return arr.map((w) => ({ ...w, type }));
}

export const weapons: Weapon[] = [...swords, ...daggers, ...clubs];
