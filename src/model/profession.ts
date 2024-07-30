export const FIGHTER_DMG_MULTIPLIER = 0.1;
export const BRUTE_DMG_MULTIPLIER = 0.15;

export type FighterLine = {
	line: 'fighter';
	specialization?: FighterSpecialization;
};

export type SelectedProfession = {
	lvl5?: LVL5Skill;
	lvl10?: Lvl10Skills;
};

export type FighterSpecialization = 'brute' | 'defender';
export type ScoutSpecialization = 'acrobat' | 'desperado';
export type ScoutLine = {
	line: 'scout';
	specialization?: ScoutSpecialization;
};

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
