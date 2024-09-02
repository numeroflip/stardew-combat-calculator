<script lang="ts">
	import CalculationResults from '$lib/components/CalculationResults/CalculationResults.svelte';
	import EnchantmentPicker from '$lib/components/EnchantmentPicker.svelte';
	import GemPicker from '$lib/components/GemPicker.svelte';
	import LuckFromFoodSlider from '$lib/components/LuckFromFoodSlider.svelte';
	import RingPairPicker from '$lib/components/RingPairPicker.svelte';
	import SkillPicker from '$lib/components/SkillPicker.svelte';
	import WeaponPicker from '$lib/components/WeaponPicker.svelte';

	import { calculatorStorage } from '$lib/calculatorOptionsStorage';
	import AttackFromFoodSlider from '$lib/components/AttackFromFoodSlider.svelte';
	import BlessingSelector from '$lib/components/BlessingSelector/BlessingSelector.svelte';
	import DarkModeSwitcher from '$lib/components/DarkModeSwitcher.svelte';
	import Header from '$lib/components/Header.svelte';
	import SpeedFromFoodSlider from '$lib/components/SpeedFromFoodSlider.svelte';
	import FlagText from '$lib/components/ui/FlagText.svelte';
	import Surface from '$lib/components/ui/Surface.svelte';
	import { parseJSON } from '$lib/json';
	import {
		attackFromFoodStore,
		luckStore,
		selectedCalculatorOptionsStore,
		setCalculatorOptions,
		speedFromFoodStore
	} from '$lib/store/calculatorOptions';
	import { calculatorOptionsSchema, type CalculatorOptions } from '$model/calculatorOptions';
	import queryString from 'query-string';
	import { onMount } from 'svelte';

	let initialized = false;

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

	let innerWidth: number;
</script>

<svelte:head>
	<title>Stardew Combat Calculator</title>
</svelte:head>
<svelte:window bind:innerWidth />
<Surface
	class="main-grid main-grid  max-w:none container mx-auto flex min-h-dvh w-full  flex-col  border-transparent bg-blue-gradient  px-0   dark:bg-night-gradient md:min-h-0  md:border-[#b14e05] lg:max-w-[calc(100vw-3rem)] lg:border-solid xl:max-w-screen-xl "
>
	<div class="absolute bottom-[1px] right-2 z-20 sm:bottom-2 sm:right-5">
		<DarkModeSwitcher />
	</div>
	{#if isOnClient}
		<Header />

		<main
			class="flex h-full w-full grow snap-y snap-mandatory scroll-p-5 flex-col gap-7 overflow-y-auto px-3 py-5 pb-10 shadow-theme [grid-area:options] sm:grid sm:grid-cols-2 sm:px-3 sm:shadow-none md:gap-8 md:px-4 md:py-5 md:pb-8 lg:px-10 lg:py-10 lg:shadow-theme"
		>
			<div class="flex flex-col gap-[inherit] sm:order-2 lg:justify-between">
				<Surface class="max-h-full snap-start px-5 py-3  ">
					<FlagText class="mx-auto mb-4 lg:mb-5 ">
						<h3 class=" text-center text-3xl lg:block">Weapon</h3>
					</FlagText>

					<div class="mx-auto flex h-full w-full flex-col gap-3 lg:gap-5">
						<div class="z-[3]">
							<div class=" z-[3] flex flex-col gap-5">
								<WeaponPicker />
							</div>
						</div>

						<section class=" z-[2] flex w-full justify-between gap-5 pl-2 @container">
							<div class="flex items-center font-sans text-2xl text-black">Gems</div>
							<div class=" flex gap-[1px]">
								<GemPicker index={0} />
								<GemPicker index={1} />
								<GemPicker index={2} />
							</div>
						</section>
						<!-- Enchantment -->

						<EnchantmentPicker />
					</div>
				</Surface>

				<!-- Rings -->
				<Surface class="snap-start px-5 py-3  ">
					<FlagText class="mx-auto mb-4 lg:mb-5">
						<h3 class=" text-center text-3xl lg:block">Rings</h3>
					</FlagText>

					<fieldset class="flex justify-between gap-4 @container">
						<RingPairPicker type="left" />
						<RingPairPicker type="right" />
					</fieldset>
				</Surface>
			</div>
			<div class="flex flex-col gap-[inherit] lg:justify-between">
				<Surface class="snap-start px-5 py-3  ">
					<FlagText class="mx-auto mb-4 lg:mb-5">
						<h3 class=" text-center text-3xl lg:block">Skills</h3>
					</FlagText>

					<SkillPicker />
				</Surface>
				<Surface class="snap-start px-5 py-3 ">
					<FlagText class="mx-auto mb-4 lg:mb-5">
						<h3 class=" text-center text-3xl lg:block">Food Buffs</h3>
					</FlagText>

					<div class="grid grid-cols-1 justify-items-center px-2 font-sans text-black md:gap-1">
						<section class="flex w-full items-center justify-center gap-8">
							<h5 class="flex shrink-0 basis-[95px] items-center gap-2 text-2xl">
								<img
									src="https://stardewvalleywiki.com/mediawiki/images/thumb/f/f0/Luck.png/24px-Luck.png"
									alt=""
									class="size-6 object-cover"
								/>
								Luck
							</h5>
							<div class=" grow">
								<LuckFromFoodSlider />
							</div>
							<div class="basis-6 text-xl">{$luckStore.dirty ?? $luckStore.selected}</div>
						</section>
						<section class="flex w-full items-center justify-center gap-8">
							<h5 class="flex shrink-0 basis-[95px] items-center gap-2 text-2xl">
								<img
									src="https://stardewvalleywiki.com/mediawiki/images/thumb/9/94/Speed.png/24px-Speed.png"
									alt=""
									class="size-6 object-cover"
								/>
								Speed
							</h5>
							<div class=" grow">
								<SpeedFromFoodSlider />
							</div>
							<div class="basis-6 text-xl">
								{$speedFromFoodStore.dirty ?? $speedFromFoodStore.selected}
							</div>
						</section>
						<section class="flex w-full items-center justify-center gap-8">
							<h5 class="flex shrink-0 basis-[95px] items-center gap-2 text-2xl">
								<img
									src="https://stardewvalleywiki.com/mediawiki/images/thumb/0/00/Attack.png/24px-Attack.png"
									alt=""
									class="size-6 object-cover"
								/>
								Attack
							</h5>
							<div class=" grow">
								<AttackFromFoodSlider />
							</div>
							<div class="basis-6 text-xl">
								{$attackFromFoodStore.dirty ?? $attackFromFoodStore.selected}
							</div>
						</section>
					</div>
				</Surface>

				<Surface class="snap-start px-5 py-3 ">
					<div
						class="flex flex-col justify-center gap-4 @md:flex-row @md:items-center @md:justify-between lg:gap-5"
					>
						<FlagText class=" self-start">
							<h3 class="">Blessings</h3>
						</FlagText>

						<BlessingSelector />
					</div>
				</Surface>
			</div>

			<!-- RESULTS -->
		</main>

		<CalculationResults />
	{/if}
</Surface>
