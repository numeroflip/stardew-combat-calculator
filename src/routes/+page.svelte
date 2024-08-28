<script lang="ts">
	import GemPicker from '$lib/components/GemPicker.svelte';
	import RingPairPicker from '$lib/components/RingPairPicker.svelte';
	import WeaponPicker from '$lib/components/WeaponPicker.svelte';
	import EnchantmentPicker from '$lib/components/EnchantmentPicker.svelte';
	import SkillPicker from '$lib/components/SkillPicker.svelte';
	import CalculationResults from '$lib/components/CalculationResults.svelte';
	import LuckFromFoodPicker from '$lib/components/LuckFromFoodPicker.svelte';

	import queryString from 'query-string';
	import { calculatorOptionsSchema, type CalculatorOptions } from '$model/calculatorOptions';
	import { buttonVariants } from '$lib/components/ui/button';
	import Header from '$lib/components/Header.svelte';
	import { onMount, tick } from 'svelte';
	import {
		setCalculatorOptions,
		hasBlessingOfFangsStore,
		selectedCalculatorOptionsStore
	} from '$lib/store/calculatorOptions';
	import { get } from 'svelte/store';

	export const ssr = false;
	const DEFAULT_OPTIONS_KEY = 'options';

	let initialized = false;

	let options = get(selectedCalculatorOptionsStore);
	$: options = $selectedCalculatorOptionsStore;

	onMount(() => {
		const initialOptionsFromStorage = getOptionsFromStorage();
		const initialOptionsFromQuery = getOptionsFromQueryParams();
		const initialOptions = initialOptionsFromQuery || initialOptionsFromStorage;

		if (initialOptions) {
			setCalculatorOptions(initialOptions);
		}

		initialized = true;
	});

	function getOptionsFromStorage(key: string = DEFAULT_OPTIONS_KEY): CalculatorOptions | undefined {
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

	function getOptionsFromQueryParams(): CalculatorOptions | undefined {
		const queryRaw = queryString.parse(location.search)?.options;

		if (typeof queryRaw !== 'string') {
			return;
		}

		const queryParsed = queryRaw
			? calculatorOptionsSchema.safeParse(parseJSON(queryRaw))
			: undefined;

		const optionsInitialFromQuery = queryParsed?.data;
		const url = new URL(window.location.toString());
		url.searchParams.delete('options');
		history.replaceState({}, '', url);
		return optionsInitialFromQuery;
	}

	$: {
		if (typeof window !== 'undefined' && initialized) {
			localStorage.setItem(DEFAULT_OPTIONS_KEY, JSON.stringify($selectedCalculatorOptionsStore));
		}
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
			alert('The share link is copied to the clipboard');
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

	function parseJSON(data: string) {
		return JSON.parse(data, (key, value) => (value === null ? undefined : value));
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
	async function onLoad() {
		const savedNames = getSavedOptionKeys();

		const selection = await prompt(`pick a name from: ${savedNames.toString()}`);
		if (selection && savedNames.includes(selection)) {
			loadLocalStorageOption(selection);
		}
	}
	const isOnClient = typeof window !== 'undefined';
</script>

<div
	class="lg:pixel-corners-border--lg haupt-grid bg container mx-auto flex h-full min-h-screen w-full max-w-screen-lg flex-col border-4 border-surface-900 bg-surface-300 px-0 lg:border-none dark:bg-surface-900"
>
	{#if isOnClient}
		<Header {handleShare} onSave={handleSave} {onLoad} />

		<main
			class="grid-area-[options] h-full w-full grow overflow-y-auto bg-gradient-to-t from-surface-300 to-surface-200 px-2 py-2 shadow-theme dark:from-surface-950/50 dark:to-surface-950"
		>
			<section class="flex grow flex-col">
				<h3 class="mb-4 hidden text-3xl lg:block">Weapon</h3>
				<div class="pixel-corners bob mx-auto flex h-full w-full flex-col gap-3 md:max-w-md">
					<div class="z-[3]">
						<div class="pixel-corners z-[3] flex flex-col gap-5 bg-surface-50 px-5">
							<WeaponPicker />
						</div>
					</div>

					<section class=" z-[2] flex w-full justify-between gap-5 pl-2">
						<div class="flex items-center text-2xl">Gems:</div>
						<div class="flex gap-3">
							<GemPicker index={0} />
							<GemPicker index={1} />
							<GemPicker index={2} />
						</div>
					</section>
					<!-- Enchantment -->

					<EnchantmentPicker />
				</div>
			</section>

			<!-- Rings -->
			<section
				class="flex w-full flex-wrap items-center justify-between gap-10 self-stretch py-1 pl-4 pr-1"
			>
				<h3 class="text-2xl text-surface-950">Rings:</h3>
				<fieldset class="flex justify-between gap-4">
					<RingPairPicker type="left" />
					<RingPairPicker type="right" />
				</fieldset>
			</section>

			<!-- LUCK AND BLESSING -->
			<section class="mt-10 flex flex-col gap-5">
				<div class="grid grid-cols-2">
					<!-- Luck -->
					<section class="flex flex-col items-center gap-5">
						<h3 class="text-2xl">Luck (from food)</h3>

						<LuckFromFoodPicker />
					</section>

					<!-- Blessing -->
					<section class="flex flex-col items-center gap-5">
						<label for="blessing-of-fangs"><h3 class="text-2xl">Blessing of Fangs</h3></label>

						<label
							class={`${buttonVariants({
								variant: 'pixelated',
								size: 'unset'
							})} ${$hasBlessingOfFangsStore.selected ? '' : 'opacity-30 grayscale'} grid size-16 cursor-pointer place-content-center`}
							for="blessing-of-fangs"
						>
							<img
								src="https://stardewvalleywiki.com/mediawiki/images/a/af/Blessing_Of_Fangs.png"
								alt="blessing of fangs"
								class="size-10 object-cover"
							/>
						</label>
						<input
							type="checkbox"
							bind:checked={$hasBlessingOfFangsStore.selected}
							class="sr-only"
							id="blessing-of-fangs"
						/>
					</section>
				</div>
			</section>

			<section class="mt-auto flex w-full flex-wrap items-center gap-10">
				<h3 class="text-3xl">Skills</h3>
				<SkillPicker />
			</section>

			<!-- RESULTS -->
		</main>
		<footer class="grid-area-[results]">
			<section
				class="flex h-full w-full flex-1 grow flex-col gap-3 p-0 [grid-area:results] lg:px-10 lg:pb-10 lg:pt-10"
			>
				<!-- <h3 class="text-3xl">Results</h3> -->
				<CalculationResults />
			</section>
		</footer>
	{/if}
</div>

<style>
	.bob {
		background-color: transparent;

		--color: theme('colors.surface.100');

		background-image: radial-gradient(
			ellipse farthest-corner at 2px 2px,
			var(--color),
			var(--color) 50%,
			transparent 50%
		);
		background-size: 2px 2px;
	}

	.haupt-grid {
		display: grid;
		grid-template-rows: auto 1fr auto;

		height: 100dvh;
		grid-template-areas:
			'header'
			'options'
			'results';
	}
</style>
