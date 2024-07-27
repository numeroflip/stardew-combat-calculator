type FighterLine = {
	line: 'fighter';
	specialization: 'brute' | 'defender';
};

type ScoutLine = {
	line: 'scout';
	specialization: 'acrobat' | 'desperado';
};

export type CombatProfession = FighterLine | ScoutLine | null;
