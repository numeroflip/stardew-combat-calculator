export const FIGHTER_DMG_MULTIPLIER = 0.1;
export const BRUTE_DMG_MULTIPLIER = 0.15;

export type FighterLine = {
	line: 'fighter';
	specialization?: FighterSpecialization;
};

export type FighterSpecialization = 'brute' | 'defender';
export type ScoutSpecialization = 'acrobat' | 'desperado';
export type ScoutLine = {
	line: 'scout';
	specialization?: ScoutSpecialization;
};

export const combatProfessionLines = ['fighter', 'scout'] as const;

export type CombatProfession = FighterLine | ScoutLine;
