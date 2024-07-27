export type Stats = {
	speed?: number;
	damage?: number;
	critPower?: number;
	critChance?: number;
	defense?: number;
	weight?: number;
};

export type WeaponType = 'sword' | 'dagger' | 'mace';

export type WeaponBase = {
	name: string;
	level: number;
	damage: [number, number];
	critStrikeChance: number;
	stats?: Stats;
};

export type Weapon = WeaponBase & { type: WeaponType };
