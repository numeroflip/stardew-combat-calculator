<script lang="ts">
	import {
		enchantmentStore,
		gemsStore,
		hasBlessingOfFangsStore,
		luckStore,
		ringStore,
		selectedCalculatorOptionsStore,
		setCalculatorOptions,
		skillsStore,
		weaponNameStore
	} from '$lib/store/calculatorOptions';
	import { toast } from 'svelte-sonner';
	import { calculatorOptionsSchema } from '$model/calculatorOptions';
	import queryString from 'query-string';

	function onReset() {
		gemsStore.reset();
		weaponNameStore.reset();
		ringStore.reset();
		gemsStore.reset();
		luckStore.reset();
		hasBlessingOfFangsStore.reset();
		skillsStore.reset();
		enchantmentStore.reset();
	}

	function handleShare() {
		const params = queryString.stringify({
			options: JSON.stringify($selectedCalculatorOptionsStore)
		});
		const link = `${window.location.origin}?${params}`;

		if (navigator?.share) {
			navigator.share({ text: link });
		} else {
			navigator.clipboard.writeText(link);
			toast('The link is copied to the clipboard');
		}
	}

	function loadLocalStorageOption(key: string) {
		const loadedOptions = localStorage.getItem(key);
		if (!loadedOptions) {
			return;
		}
		const parsedOptions = calculatorOptionsSchema.safeParse(parseJSON(loadedOptions));

		if (parsedOptions.data) {
			setCalculatorOptions(parsedOptions.data);
		}
	}

	function parseJSON(data: string) {
		return JSON.parse(data, (key, value) => (value === null ? undefined : value));
	}

	async function onLoad() {
		const savedNames = getSavedOptionKeys();

		const selection = await prompt(`pick a name from: ${savedNames.toString()}`);
		if (selection && savedNames.includes(selection)) {
			loadLocalStorageOption(selection);
		}
	}

	async function handleSave() {
		const name = await prompt('Give it a name');

		if (!name) {
			handleSave();
			return;
		}

		localStorage.setItem(
			`__named__option__${name}`,
			JSON.stringify($selectedCalculatorOptionsStore)
		);
	}
	function getSavedOptionKeys() {
		let keys: string[] = [];

		for (const key in localStorage) {
			if (key.startsWith('__named__option__')) {
				keys.push(key);
			}
		}
		return keys;
	}
</script>

<div class="flex justify-center gap-2 bg-surface-100/30 p-1 text-xl">
	<button class=" bg-surface-300 px-3 py-1 shadow-theme-item" on:click={handleShare}>Share</button>
	<button class=" bg-surface-300 px-3 py-1 shadow-theme-item" on:click={handleSave}>Save</button>
	<button class=" bg-surface-300 px-3 py-1 shadow-theme-item" on:click={onLoad}>Load</button>
	<button class=" bg-surface-300 px-3 py-1 shadow-theme-item" on:click={onReset}>Reset</button>
</div>
