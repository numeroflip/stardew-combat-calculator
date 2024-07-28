export type Stats = {
	speed?: number;
	damage?: number;
	critPower?: number;
	critMultiplier?: number;
	critChance?: number;
	defense?: number;
	weight?: number;
};

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
