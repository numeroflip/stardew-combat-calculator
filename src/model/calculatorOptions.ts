import { z } from 'zod';
import { ringNameSchema } from './ring';
import { gemNameSchema } from './gem';
import {
	lvl10FighterSchema,
	lvl10ScoutSchema,
	lvl5FighterSchema,
	lvl5ScoutSchema
} from './profession';
import { selectedEnchantmentSchema } from './enchantment';

export const skillSchema = z
	.object({
		lvl5: lvl5FighterSchema.optional(),
		lvl10: lvl10FighterSchema.optional()
	})
	.or(
		z.object({
			lvl5: lvl5ScoutSchema.optional(),
			lvl10: lvl10ScoutSchema.optional()
		})
	);

const ringsSchema = z.object({
	left: z.array(ringNameSchema.optional()).length(2).optional(),
	right: z.array(ringNameSchema.optional()).length(2).optional()
});

export const blessingSchema = z.enum(['fangs', 'luck', 'speed']);

export type Blessing = z.infer<typeof blessingSchema>;

export const calculatorOptionsSchema = z.object({
	weapon: z.string(),
	enchantment: selectedEnchantmentSchema.optional(),
	skills: skillSchema.optional(),
	gems: z.array(gemNameSchema.optional()).length(3).optional(),
	rings: ringsSchema.optional(),
	blessing: blessingSchema.optional(),
	luck: z.number().optional(),
	speedFromFood: z.number().max(3).min(0).optional(),
	attackFromFood: z.number().max(5).min(0).optional()
});

export type CalculatorOptions = z.infer<typeof calculatorOptionsSchema>;
