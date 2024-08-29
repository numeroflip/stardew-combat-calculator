<script lang="ts">
	import {
		lastLoadedOptionsKey,
		selectedCalculatorOptionsStore,
		setCalculatorOptions
	} from '$lib/store/calculatorOptions';
	import {
		DialogContent,
		DialogClose,
		DialogHeader,
		DialogTitle,
		Dialog,
		DialogTrigger,
		DialogOverlay
	} from '../ui/dialog';
	import { Button } from '../ui/button';
	import { calculatorOptionsSchema, type CalculatorOptions } from '$model/calculatorOptions';
	import { weapons } from '$model/weapon.data';
	import { calculatorStorage } from '$lib/calculatorOptionsStorage';
	import { toast, Toaster } from 'svelte-sonner';
	import DialogDescription from '../ui/dialog/dialog-description.svelte';

	let open = false;

	function getItemsFromLocalStorage() {
		let keys: string[] = [];
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
				const data = calculatorStorage.loadOptions(key);
				const weaponData = weapons.find((weapon) => weapon.name === data?.weapon);

				return data ? { ...data, weaponData, key: key, savedName: key } : undefined;
			})
			.filter(Boolean);
	}

	let items = getItemsData();
	$: if (open) {
		items = getItemsData();
	}

	function onDelete(key: string) {
		localStorage.removeItem(key);
		items = getItemsData();
	}

	function onSelect(key: string) {
		const options = calculatorStorage.loadOptions(key);
		lastLoadedOptionsKey.set(key);
		if (options) {
			setCalculatorOptions(options);
		}

		if (!options) {
			toast.error('Failed to load configuration');
		}
		open = false;
	}
</script>

<Dialog portal={document.querySelector('main')} bind:open>
	<DialogTrigger>
		<slot />
	</DialogTrigger>
	<DialogOverlay class="bg-transparent blur-none" />
	<DialogContent class=" bg-gradient-to-br from-surface-200 to-surface-300/80 shadow-theme">
		<DialogHeader>
			<DialogTitle class="text-2xl font-normal">Choose configuration to load</DialogTitle>
		</DialogHeader>

		{#each items as item (item.key)}
			<li class="align-center flex items-stretch gap-1">
				<Button
					variant="defaultLight"
					on:click={() => onSelect(item.key)}
					class="flex w-full justify-start bg-surface-300 text-lg"
				>
					<img alt="" src={item?.weaponData?.icon} class="size-8 p-2" />
					{item.savedName}
				</Button>

				<Button
					variant="defaultLight"
					size="sm"
					on:click={() => onDelete(item.key)}
					class="h-full w-fit bg-red-300 px-5 py-0 text-lg leading-7 shadow-theme-item"
					>Delete</Button
				>
			</li>
		{/each}
		{#if items.length === 0}
			<DialogDescription class="text-center text-lg text-surface-900/50"
				>There are no saved configurations yet :{'('}</DialogDescription
			>
		{/if}
	</DialogContent>
</Dialog>
