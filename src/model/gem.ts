import { keysOf } from '$lib/objectUtils';
import { statSchema } from './stat';

import { z } from 'zod';

export const gemNameSchema = z.enum(['ruby', 'aquamarine', 'jade', 'amethyst', 'emerald', 'topaz']);
export const gemNames = keysOf(gemNameSchema.enum);
export const gemSchema = z.object({
	name: gemNameSchema,
	stats: z.array(statSchema).length(3)
});

export type Gem = z.infer<typeof gemSchema>;
export type GemName = z.infer<typeof gemNameSchema>;
