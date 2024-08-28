import { z } from 'zod';
import { weaponSchema, type Weapon } from './weapon';
import { createKeyedObject } from '$lib/objectUtils';

export const OptionalEnchantmentNameSchema = z.enum(['def', 'weight']);
export type OptionalEnchantmentName = z.infer<typeof OptionalEnchantmentNameSchema>;

export const GuaranteedEnchantmentNameSchema = z.enum([
	'critPower',
	'critChance',
	'attack',
	'speed'
]);
export type GuaranteedEnchantmentName = z.infer<typeof GuaranteedEnchantmentNameSchema>;

type InnateEnchantments = {
	optional: Record<OptionalEnchantmentName, Enchantment>;
	guaranteed: Record<GuaranteedEnchantmentName, Enchantment>;
};

export const innateEnchantments: InnateEnchantments = {
	optional: createKeyedObject('id', [
		defineEnchantment({
			id: 'def',
			name: 'Def',
			options: [defineOption(1), defineOption(2)],
			isAllowed: (w: Weapon) => w.level < 10
		}),
		defineEnchantment({
			id: 'weight',
			name: 'Weight',
			options: [
				defineOption(-0.1),
				defineOption(-0.2),
				defineOption(-0.3),
				defineOption(-0.4),
				defineOption(-0.5)
			]
		})
	]),
	guaranteed: createKeyedObject('id', [
		defineEnchantment({
			id: 'critPower',
			name: 'Crit. Power',
			options: [defineOption(25, 0.5), defineOption(50, 1), defineOption(75, 1.5)]
		}),
		defineEnchantment({
			id: 'critChance',
			name: 'Crit. Chance',
			options: [defineOption(1, 0.02), defineOption(2, 0.04), defineOption(3, 0.06)]
		}),
		defineEnchantment({
			id: 'attack',
			name: ' Attack',
			options: [
				defineOption(1, 3),
				defineOption(2, 6),
				defineOption(3, 9),
				defineOption(4, 12),
				defineOption(5, 15)
			]
		}),
		defineEnchantment({
			id: 'speed',
			name: 'Speed',
			options: [
				defineOption(1, 0.01),
				defineOption(2, 0.02),
				defineOption(3, 0.03),
				defineOption(4, 0.04)
			]
		})
	])
};

function defineEnchantment(obj: Enchantment) {
	return obj;
}

const optionSchema = z.object({
	name: z.string(),
	value: z.number()
});

export const enchantmentSchema = z.object({
	id: OptionalEnchantmentNameSchema.or(GuaranteedEnchantmentNameSchema),
	name: z.string(),
	options: z.array(optionSchema),
	isAllowed: z.optional(z.function().args(weaponSchema).returns(z.boolean()))
});

type Enchantment = z.infer<typeof enchantmentSchema>;

export const guaranteedEnchantmentTupleSchema = z
	.tuple([GuaranteedEnchantmentNameSchema, optionSchema.shape.name])
	.refine(
		(data) => {
			const enchantmentKey = data[0];
			const optionKey = data[1];
			return innateEnchantments.guaranteed[enchantmentKey].options.some(
				(option) => option.name == optionKey
			);
		},
		{
			message: 'Invalid option for the given key'
		}
	);

export const selectedEnchantmentSchema = z.object({
	key: GuaranteedEnchantmentNameSchema,
	optionName: z.string()
});

export type SelectedEnchantment = z.infer<typeof selectedEnchantmentSchema>;

function defineOption(name: number | string, value?: number) {
	return { name: String(name), value: value ?? Number(name) };
}

export const GuaranteedInnateEnchantmentSchema = z.enum([
	'critPower',
	'critChance',
	'attack',
	'speed'
]);
export type GuaranteedInnateEnchantment = z.infer<typeof GuaranteedInnateEnchantmentSchema>;

export type InnateEnchantment<T extends GuaranteedInnateEnchantment> = {
	name: T;
	option: (typeof innateEnchantments)['guaranteed'][T]['options'][number];
};
