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
