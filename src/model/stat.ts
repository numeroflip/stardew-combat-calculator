import { z } from 'zod';

export const statSchema = z.object({
	speed: z.number().optional(),
	damage: z.number().optional(),
	critPower: z.number().optional(),
	critMultiplier: z.number().optional(),
	critChance: z.number().optional(),
	defense: z.number().optional(),
	weight: z.number().optional()
});

export type Stats = z.infer<typeof statSchema>;

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
