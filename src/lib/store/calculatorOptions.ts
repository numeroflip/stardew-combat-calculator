import type { Blessing, CalculatorOptions } from '$model/calculatorOptions';
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
	'weapon' | 'gems' | 'rings' | 'enchantment' | 'blessing'
> & {
	weapon: Weapon;
	gems: (GemName | undefined)[];
	enchantment: SelectedEnchantment | undefined;
	rings: {
		left: (RingName | undefined)[];
		right: (RingName | undefined)[];
	};
	blessing: Blessing | undefined;
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
	blessing: undefined,
	speedFromFood: 0,
	attackFromFood: 0
};

export const lastLoadedOptionsKey = writable<string | undefined>();

export const weaponNameStore = createOption(DEFAULT_OPTIONS.weapon.name, undefined);
export const blessingStore = createOption<Blessing | undefined, Blessing | undefined>(
	undefined,
	undefined
);

export const speedFromFoodStore = createOption(DEFAULT_OPTIONS.speedFromFood, undefined);

export const attackFromFoodStore = createOption(DEFAULT_OPTIONS.attackFromFood, undefined);

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
		blessingStore,
		gemsStore,
		skillsStore,
		luckStore,
		enchantmentStore,
		ringStore,
		speedFromFoodStore,
		attackFromFoodStore
	],
	([
		weaponName,
		blessing,
		gems,
		skills,
		luck,
		enchantment,
		rings,
		speedFromFood,
		attackFromFood
	]) => {
		return {
			weapon: weaponName,
			blessing,
			gems,
			skills,
			luck,
			enchantment,
			rings,
			speedFromFood,
			attackFromFood
		};
	}
);

export function setCalculatorOptions(options: CalculatorOptions) {
	weaponNameStore.setSelected(options.weapon);
	weaponNameStore.clearDirty();
	if (typeof options.blessing === 'string') {
		blessingStore.setSelected(options.blessing);
		blessingStore.clearDirty();
	}
	if (options.gems) {
		gemsStore.setSelected(options.gems);
		gemsStore.clearDirty();
	}

	if (options.skills) {
		skillsStore.setSelected(options.skills);
		skillsStore.clearDirty();
	}

	if (typeof options.luck === 'number') {
		luckStore.setSelected(options.luck);
		luckStore.clearDirty();
	}

	if (options.enchantment) {
		enchantmentStore.setSelected(options.enchantment);
		enchantmentStore.clearDirty();
	}

	if (options.rings) {
		ringStore.setSelected(defineRings(options.rings?.left, options.rings?.right));
		ringStore.clearDirty();
	}

	if (typeof options.speedFromFood === 'number') {
		speedFromFoodStore.setSelected(options.speedFromFood);
		speedFromFoodStore.clearDirty();
	}

	if (typeof options.attackFromFood === 'number') {
		attackFromFoodStore.setSelected(options.attackFromFood);
		attackFromFoodStore.clearDirty();
	}
}

export const selectedCalculatorOptionsStore = derived(calculatorOptionsStore, (options) => {
	return {
		weapon: options.weapon.selected,
		blessing: options.blessing.selected,
		gems: options.gems.selected,
		skills: options.skills.selected,
		luck: options.luck.selected,
		enchantment: options.enchantment.selected,
		rings: options.rings.selected,
		speedFromFood: options.speedFromFood.selected,
		attackFromFood: options.attackFromFood.selected
	};
});

export const dirtyCalculatorOptions = derived(calculatorOptionsStore, (options) => {
	return {
		weapon: options.weapon.dirty,
		blessing: options.blessing.dirty,
		gems: options.gems.dirty,
		skills: options.skills.dirty,
		luck: options.luck.dirty,
		enchantment: options.enchantment.dirty,
		rings: options.rings.dirty,
		speedFromFood: options.speedFromFood.dirty,
		attackFromFood: options.attackFromFood.dirty
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
		setSelected: (value: T | ((val: T) => T)) => {
			if (value instanceof Function) {
				update((v) => ({ ...v, selected: value(v.selected) }));
			} else {
				update((v) => ({ ...v, selected: value }));
			}
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
