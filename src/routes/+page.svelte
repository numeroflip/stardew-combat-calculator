<script lang="ts">
	import GemPicker from '$lib/components/GemPicker.svelte';
	import RingPairPicker from '$lib/components/RingPairPicker.svelte';
	import WeaponPicker from '$lib/components/WeaponPicker.svelte';
	import EnchantmentPicker from '$lib/components/EnchantmentPicker.svelte';
	import SkillPicker from '$lib/components/SkillPicker.svelte';
	import CalculationResults from '$lib/components/CalculationResults/CalculationResults.svelte';
	import LuckFromFoodPicker from '$lib/components/LuckFromFoodPicker.svelte';

	import queryString from 'query-string';
	import { calculatorOptionsSchema, type CalculatorOptions } from '$model/calculatorOptions';
	import { buttonVariants } from '$lib/components/ui/button';
	import Header from '$lib/components/Header.svelte';
	import { onMount, tick } from 'svelte';
	import {
		setCalculatorOptions,
		blessingStore,
		selectedCalculatorOptionsStore
	} from '$lib/store/calculatorOptions';
	import { get } from 'svelte/store';
	import { calculatorStorage } from '$lib/calculatorOptionsStorage';
	import BlessingSelector from '$lib/components/BlessingSelector/BlessingSelector.svelte';
	import SpeedFromFoodPicker from '$lib/components/SpeedFromFoodPicker.svelte';
	import { LucideHeading5 } from 'lucide-svelte';
	import { parseJSON } from '$lib/json';

	let initialized = false;

	let options = get(selectedCalculatorOptionsStore);
	$: options = $selectedCalculatorOptionsStore;

	onMount(() => {
		const initialOptionsFromStorage = calculatorStorage.loadOptions();
		const initialOptionsFromQuery = getOptionsFromQueryParams();
		const initialOptions = initialOptionsFromQuery || initialOptionsFromStorage;

		if (initialOptions) {
			setCalculatorOptions(initialOptions);
		}

		initialized = true;
	});

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
			calculatorStorage.saveOptions($selectedCalculatorOptionsStore);
		}
	}

	const isOnClient = typeof window !== 'undefined';
</script>

<div
	class="lg:pixel-corners-border--lg haupt-grid bg container mx-auto flex h-full min-h-dvh w-full max-w-screen-lg flex-col border-surface-900 bg-surface-300 px-0 dark:bg-surface-900 md:min-h-0 md:border-4 lg:border-none"
>
	{#if isOnClient}
		<Header />

		<main
			class="flex h-full w-full grow flex-col gap-5 overflow-y-auto bg-gradient-to-b from-[#144683] to-[#258BF0] px-1 py-5 shadow-theme [grid-area:options] dark:from-surface-950/50 dark:to-surface-950 md:px-4 md:py-5 md:pb-8 *:md:max-w-[460px]"
		>
			<section class="pixel-border flex grow flex-col bg-surface-200 p-3 pt-2">
				<h3 class="mb-2 text-center text-3xl lg:block">Weapon</h3>
				<div class="pixel-corners mx-auto flex h-full w-full flex-col gap-3">
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
				class="pixel-border flex w-full grow flex-col flex-wrap items-center justify-between gap-x-10 gap-y-3 self-stretch bg-surface-200 py-1 pb-4 pl-4 pr-1 pt-3"
			>
				<h3 class="mb-2 text-center text-3xl lg:block">Rings</h3>
				<fieldset class="flex justify-between gap-4">
					<RingPairPicker type="left" />
					<RingPairPicker type="right" />
				</fieldset>
			</section>

			<section
				class="pixel-border flex w-full flex-col flex-wrap items-center justify-center gap-x-10 gap-y-3 bg-surface-200 px-3 pb-2 pt-3"
			>
				<h3 class="text-3xl">Skills</h3>
				<SkillPicker />
			</section>

			<section class="pixel-border flex flex-col gap-5 bg-surface-200 px-3 py-3">
				<h3 class="mb-2 text-center text-3xl lg:block">Food Buffs</h3>

				<div class="grid grid-cols-2 justify-items-center">
					<section class="flex items-center justify-between gap-5">
						<h5 class="text-2xl">Luck</h5>

						<LuckFromFoodPicker />
					</section>
					<section class="flex items-center justify-between gap-5">
						<h5 class="text-2xl">Speed</h5>

						<SpeedFromFoodPicker />
					</section>
				</div>
			</section>

			<section class="pixel-border flex flex-col gap-5 bg-surface-200 px-3 py-3">
				<h3 class="mb-2 text-center text-3xl lg:block">Statue Of Blessings</h3>
				<BlessingSelector />
			</section>

			<!-- RESULTS -->
		</main>
		<footer class="[grid-area:results]">
			<section class="flex h-full w-full flex-1 grow flex-col gap-3 p-0 lg:p-5 lg:pl-8">
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

		grid-template-areas:
			'header'
			'options'
			'results';

		@screen md {
			grid-template-areas:
				'header header'
				'options results';
			grid-template-columns: 1fr 400px;
		}
	}
</style>
