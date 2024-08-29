import { calculatorOptionsSchema, type CalculatorOptions } from '$model/calculatorOptions';
import { weapons } from '$model/weapon.data';
import { parseJSON } from './json';

const DEFAULT_OPTIONS_KEY = 'options';
const NAMED_OPTION_INDICATOR = '__named__option__';

function getNamedKey(name: string) {
	return `${NAMED_OPTION_INDICATOR}${name}`;
}

export function getOptionsFromStorage(key: string): CalculatorOptions | undefined {
	const valueStr = localStorage.getItem(key);

	if (!valueStr) {
		return;
	}

	const valueParsed = parseJSON(valueStr);
	const valueValidated = calculatorOptionsSchema.safeParse(valueParsed);

	if (valueValidated.error) {
		console.warn(valueValidated.error.message);
	}

	return valueValidated.data;
}

function getItemsFromLocalStorage() {
	const keys: string[] = [];
	for (const key in localStorage) {
		if (key.startsWith('__named__option__')) {
			keys.push(key.replace(/__named__option__/g, ''));
		}
	}
	return keys;
}

function getItemsData() {
	return getItemsFromLocalStorage()
		.map((key) => {
			const data = getOptionsFromStorage(`__named__option__${key}`);

			const weaponData = weapons.find((weapon) => weapon.name === data?.weapon);
			return data
				? { ...data, weaponData, key: `__named__option__${key}`, savedName: key }
				: undefined;
		})
		.filter(Boolean);
}

export const calculatorStorage = {
	saveOptions: (options: CalculatorOptions, key: string = DEFAULT_OPTIONS_KEY) => {
		const isNamedOptions = key !== DEFAULT_OPTIONS_KEY;

		localStorage.setItem(isNamedOptions ? getNamedKey(key) : key, JSON.stringify(options));
	},
	loadAllOptions: () => {
		return getItemsData();
	},
	deleteOptions: (key: string) => {
		localStorage.removeItem(getNamedKey(key));
	},

	loadOptions: (key: string = DEFAULT_OPTIONS_KEY) => {
		return getOptionsFromStorage(key === DEFAULT_OPTIONS_KEY ? key : getNamedKey(key));
	}
};
