import type { Stats } from './stat';

export type WeaponType = 'sword' | 'dagger' | 'club';

export type WeaponBase = {
	name: string;
	level: number;
	damage: [number, number];
	critStrikeChance: number;
	stats?: Stats;
	icon: string;
};

export type Weapon = WeaponBase & { type: WeaponType };
