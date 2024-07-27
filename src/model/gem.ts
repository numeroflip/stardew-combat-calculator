import type { Stats } from './weapon';

export type Gem = {
	name: string;
	stats: [Stats, Stats, Stats]; // 3 level
};

export const gemNames = ['amethyst', 'aquamarine', 'emerald', 'jade', 'ruby', 'topaz'] as const;
export type GemName = (typeof gemNames)[number];
