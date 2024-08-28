import type { CalculatorOptions } from '$model/calculatorOptions';
import type { SelectedEnchantment } from '$model/enchantment';

import type { GemName } from '$model/gem';
import type { RingName } from '$model/ring';
import type { Weapon } from '$model/weapon';
import { weapons } from '$model/weapon.data';
import { derived, writable } from 'svelte/store';

function defineRings(
	left?: (RingName | undefined)[] | undefined,
	right?: (RingName | undefined)[] | undefined
) {
	return {
		left: [left?.[0], left?.[1]],
		right: [right?.[0], right?.[1]]
	};
}

const DEFAULT_OPTIONS: Omit<
	Required<CalculatorOptions>,
	'weapon' | 'gems' | 'rings' | 'enchantment'
> & {
	weapon: Weapon;
	gems: (GemName | undefined)[];
	enchantment: SelectedEnchantment | undefined;
	rings: {
		left: (RingName | undefined)[];
		right: (RingName | undefined)[];
	};
} = {
	weapon: weapons[0],
	gems: [undefined, undefined, undefined],
	rings: defineRings(),
	enchantment: undefined,
	skills: {
		lvl5: undefined,
		lvl10: undefined
	},
	luck: 0,
	hasBlessingOfFangs: false
};

export const weaponNameStore = createOption(DEFAULT_OPTIONS.weapon.name, undefined);
export const hasBlessingOfFangsStore = createOption(false, false);
export const gemsStore = createOption(DEFAULT_OPTIONS.gems, DEFAULT_OPTIONS.gems);
export const ringStore = createOption(DEFAULT_OPTIONS.rings, DEFAULT_OPTIONS.rings);
export const skillsStore = createOption(DEFAULT_OPTIONS.skills, DEFAULT_OPTIONS.skills);
export const luckStore = createOption(DEFAULT_OPTIONS.luck, undefined);
export const enchantmentStore = createOption(DEFAULT_OPTIONS.enchantment, undefined);

export const weaponStore = derived(weaponNameStore, ({ selected, dirty }) => {
	return {
		selected: weapons.find((w) => w.name === selected),
		dirty: weapons.find((w) => w.name === dirty)
	};
});

export const calculatorOptionsStore = derived(
	[
		weaponNameStore,
		hasBlessingOfFangsStore,
		gemsStore,
		skillsStore,
		luckStore,
		enchantmentStore,
		ringStore
	],
	([weaponName, hasBlessingOfFangs, gems, skills, luck, enchantment, rings]) => {
		return {
			weapon: weaponName,
			hasBlessingOfFangs,
			gems,
			skills,
			luck,
			enchantment,
			rings
		};
	}
);

export function setCalculatorOptions(options: CalculatorOptions) {
	weaponNameStore.setSelected(options.weapon);
	if (typeof options.hasBlessingOfFangs === 'boolean') {
		hasBlessingOfFangsStore.setSelected(options.hasBlessingOfFangs);
	}
	if (options.gems) {
		gemsStore.setSelected(options.gems);
	}

	if (options.skills) {
		skillsStore.setSelected(options.skills);
	}

	if (typeof options.luck === 'number') {
		luckStore.setSelected(options.luck);
	}

	if (options.enchantment) {
		enchantmentStore.setSelected(options.enchantment);
	}

	if (options.rings) {
		ringStore.setSelected(defineRings(options.rings?.left, options.rings?.right));
	}
}

export const selectedCalculatorOptionsStore = derived(calculatorOptionsStore, (options) => {
	return {
		weapon: options.weapon.selected,
		hasBlessingOfFangs: options.hasBlessingOfFangs.selected,
		gems: options.gems.selected,
		skills: options.skills.selected,
		luck: options.luck.selected,
		enchantment: options.enchantment.selected,
		rings: options.rings.selected
	};
});

export const dirtyCalculatorOptions = derived(calculatorOptionsStore, (options) => {
	return {
		weapon: options.weapon.dirty,
		hasBlessingOfFangs: options.hasBlessingOfFangs.dirty,
		gems: options.gems.dirty,
		skills: options.skills.dirty,
		luck: options.luck.dirty,
		enchantment: options.enchantment.dirty,
		rings: options.rings.dirty
	};
});

type Option<T> = {
	selected: T;
	dirty?: T;
};
export function getActiveValue<T extends Option<K>, K>(option: T): K {
	return option.dirty || option.selected;
}

function createOption<T, K>(selectedValue: T, dirtyValue: K | T) {
	const { subscribe, set, update } = writable(defineOption(selectedValue, dirtyValue));

	return {
		subscribe,
		setSelected: (value: T) => {
			update((v) => ({ ...v, selected: value }));
		},
		setDirty: (value: K | T) => {
			update((v) => ({ ...v, dirty: value }));
		},
		clearDirty: () => {
			update((v) => ({ ...v, dirty: dirtyValue }));
		},
		set,
		update,
		reset: () => set(defineOption(selectedValue, dirtyValue))
	};
}

function defineOption<T, K>(selectedValue: T, dirtyValue: K | T) {
	return {
		selected: selectedValue,
		dirty: dirtyValue
	};
}
