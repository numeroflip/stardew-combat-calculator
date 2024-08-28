import { z } from 'zod';
import { statSchema } from './stat';

export type WeaponType = 'sword' | 'dagger' | 'club';

export const weaponBaseSchema = z.object({
	name: z.string(),
	level: z.number(),
	damage: z.tuple([z.number(), z.number()]),
	critStrikeChance: z.number(),
	stats: z.optional(statSchema),
	icon: z.string()
});

export type WeaponBase = z.infer<typeof weaponBaseSchema>;

export const weaponSchema = weaponBaseSchema.extend({
	type: z.enum(['sword', 'dagger', 'club'])
});

export type Weapon = z.infer<typeof weaponSchema>;
