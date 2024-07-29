import type { Stats } from './stat';

export type Gem = {
	name: GemName;
	stats: [Stats, Stats, Stats]; // 3 level
};

export const gemNames = ['ruby', 'aquamarine', 'jade', 'amethyst', 'emerald', 'topaz'] as const;
export type GemName = (typeof gemNames)[number];
