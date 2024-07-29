export type Stats = {
	speed?: number;
	damage?: number;
	critPower?: number;
	critMultiplier?: number;
	critChance?: number;
	defense?: number;
	weight?: number;
};

const statToDescriptionMap: Record<keyof Stats, string> = {
	damage: 'Dmg',
	critChance: 'Crit Chance',
	critMultiplier: 'Crit Power',
	speed: 'Speed',
	defense: 'Def',
	weight: 'Weight',
	critPower: 'Crit Power'
};

export function getStatDescription(statName: keyof Stats, value: string | number): string {
	const description = statToDescriptionMap[statName];
	if (typeof value === 'string') {
		return `${description}: ${value}`;
	}
	return `${description}: ${value > 0 ? '+' : '-'}${value < 1 ? value * 100 + '%' : value}`;
}
