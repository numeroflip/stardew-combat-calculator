<script lang="ts">
	import {
		enchantmentStore,
		gemsStore,
		blessingStore,
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
	import { Dialog, DialogTrigger } from '../ui/dialog';
	import SaveConfigurationDialog from './SaveConfigurationDialog.svelte';
	import LoadConfigDialog from './LoadConfigDialog.svelte';

	function onReset() {
		gemsStore.reset();
		weaponNameStore.reset();
		ringStore.reset();
		gemsStore.reset();
		luckStore.reset();
		blessingStore.reset();
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
</script>

<div class="flex justify-center gap-2 bg-surface-100/30 p-1 text-xl">
	<button class=" bg-surface-300 px-3 py-1 shadow-theme-item" on:click={handleShare}>Share</button>

	<SaveConfigurationDialog>
		<button class=" bg-surface-300 px-3 py-1 shadow-theme-item">Save</button>
	</SaveConfigurationDialog>
	<LoadConfigDialog>
		<button class=" bg-surface-300 px-3 py-1 shadow-theme-item">Load</button>
	</LoadConfigDialog>
	<button class=" bg-surface-300 px-3 py-1 shadow-theme-item" on:click={onReset}>Reset</button>
</div>
