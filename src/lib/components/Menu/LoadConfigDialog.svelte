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
	import { calculatorOptionsSchema, type CalculatorOptions } from '$model/calculatorOptions';
	import { weapons } from '$model/weapon.data';
	import { calculatorStorage } from '$lib/calculatorOptionsStorage';
	import { toast, Toaster } from 'svelte-sonner';
	import DialogDescription from '../ui/dialog/dialog-description.svelte';
	import Button from '../ui/Button.svelte';
	import FlagText from '../ui/FlagText.svelte';

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

				return data ? { ...data, weaponData, key: key } : undefined;
			})
			.filter(Boolean);
	}

	let items = getItemsData();
	$: if (open) {
		items = getItemsData();
	}

	function onDelete(key: string) {
		calculatorStorage.deleteOptions(key);
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

<Dialog bind:open>
	<DialogTrigger>
		<slot />
	</DialogTrigger>
	<DialogOverlay class="bg-transparent blur-none" />
	<DialogContent class="border-none  p-0 shadow-none">
		<div class="p-5 text-surface-900 shadow-theme">
			<DialogHeader>
				<DialogTitle>
					<FlagText
						class="pointer-events-none relative -top-2 flex justify-center text-2xl md:text-4xl"
						>Choose a configuration</FlagText
					></DialogTitle
				>
			</DialogHeader>
			<ul class=" mt-5 flex flex-col items-stretch gap-3">
				{#each items as item (item.key)}
					<li class="align-center flex items-stretch gap-3">
						<Button class="w-full bg-surface-400" on:click={() => onSelect(item.key)}>
							<img alt="" src={item?.weaponData?.icon} class="size-9 p-1" />
							{item.key}
						</Button>

						<Button
							on:click={() => onDelete(item.key)}
							class=" w-fit bg-red-400 px-5 py-0 text-xl leading-7 ">Delete</Button
						>
					</li>
				{/each}
			</ul>
			{#if items.length === 0}
				<DialogDescription class="text-center font-stardew text-xl text-black md:text-2xl"
					>There are no saved configurations yet :{'('}</DialogDescription
				>
			{/if}
		</div>
	</DialogContent>
</Dialog>
