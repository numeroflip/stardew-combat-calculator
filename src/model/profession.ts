import { z } from 'zod';

export const FIGHTER_DMG_MULTIPLIER = 0.1;
export const BRUTE_DMG_MULTIPLIER = 0.15;

export type SelectedProfession = {
	lvl5?: LVL5Skill;
	lvl10?: Lvl10Skills;
};

export const FighterSpecializationSchema = z.enum(['brute', 'defender']);
export type FighterSpecialization = z.infer<typeof FighterSpecializationSchema>;

export const ScoutSpecializationSchema = z.enum(['acrobat', 'desperado']);
export type ScoutSpecialization = z.infer<typeof ScoutSpecializationSchema>;

export const ScoutLineSchema = z.object({
	line: z.literal('scout'),
	specialization: ScoutSpecializationSchema.optional()
});

export const lvl5FighterSchema = z.enum(['fighter']);
export const lvl10FighterSchema = z.enum(['brute', 'defender']);
export const lvl5ScoutSchema = z.enum(['scout']);
export const lvl10ScoutSchema = z.enum(['desperado', 'acrobat']);

export const skillTupleSchema = z
	.tuple([lvl5FighterSchema, lvl10FighterSchema])
	.or(z.tuple([lvl5ScoutSchema, lvl10ScoutSchema]));

export const skillSetSchema = z
	.object({
		lvl5: lvl5FighterSchema,
		lvl10: lvl10FighterSchema.optional()
	})
	.or(
		z.object({
			lvl5: lvl5ScoutSchema,
			lvl10: lvl10ScoutSchema.optional()
		})
	);

export type SkillSet = z.infer<typeof skillSetSchema>;

export const FighterLineSchema = z.object({
	line: z.literal('fighter'),
	specialization: z.optional(FighterSpecializationSchema)
});
export type FighterLine = z.infer<typeof FighterLineSchema>;

export type ScoutLine = z.infer<typeof ScoutLineSchema>;

export const combatProfessionLines = ['fighter', 'scout'] as const;

export const lvl10Skills = {
	brute: {
		name: 'Brute',
		description: 'Deal 15% more damage.',
		icon: 'https://stardewvalleywiki.com/mediawiki/images/thumb/a/aa/Brute.png/24px-Brute.png',
		parent: 'fighter'
	},

	defender: {
		name: 'Defender',
		description: '+25 HP.',
		icon: 'https://stardewvalleywiki.com/mediawiki/images/thumb/0/0d/Defender.png/24px-Defender.png',
		parent: 'fighter'
	},
	desperado: {
		name: 'Desperado',
		description: 'Critical strikes are deadlier. (2x Critical strike damage)',
		icon: 'https://stardewvalleywiki.com/mediawiki/images/thumb/5/57/Desperado.png/24px-Desperado.png',
		parent: 'scout'
	},

	acrobat: {
		name: 'Acrobat',
		description: 'Cooldown on special moves cut in half.',
		icon: 'https://stardewvalleywiki.com/mediawiki/images/thumb/8/8f/Acrobat.png/24px-Acrobat.png',
		parent: 'scout'
	}
} as const;

export const skills = {
	fighter: {
		name: 'Fighter',
		description: 'All attacks deal 10% more damage. (+15 HP)',
		icon: 'https://stardewvalleywiki.com/mediawiki/images/thumb/e/e6/Fighter.png/24px-Fighter.png',
		lvl10Skills: {
			brute: lvl10Skills.brute,
			defender: lvl10Skills.defender
		}
	},
	scout: {
		name: 'Scout',
		description: 'Critical strike chance increased by 50%.',
		icon: 'https://stardewvalleywiki.com/mediawiki/images/thumb/6/69/Scout.png/24px-Scout.png',
		lvl10Skills: {
			desperado: lvl10Skills.desperado,
			acrobat: lvl10Skills.acrobat
		}
	}
} as const;

export type LVL5Skill = keyof typeof skills;

export type Lvl10Skills = keyof typeof lvl10Skills;

export type CombatProfession = FighterLine | ScoutLine;
