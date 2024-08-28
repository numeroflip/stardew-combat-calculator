import { keysOf } from '$lib/objectUtils';
import { statSchema } from './stat';

import { z } from 'zod';

export const ringNameSchema = z.enum([
	'iridiumBand',
	'ruby',
	'aquamarine',
	'jade',
	'emerald',
	'amethyst',
	'topaz',
	'crabshell'
]);

export const ringNames = keysOf(ringNameSchema.enum);

export type RingName = z.infer<typeof ringNameSchema>;

export const RingSchema = z.object({
	name: z.string(),
	effect: statSchema,
	icon: z.string()
});

export type Ring = z.infer<typeof RingSchema>;
