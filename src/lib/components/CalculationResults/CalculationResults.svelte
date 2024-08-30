<script lang="ts">
	import { formatNumber } from '$lib/formatNumber';
	import { getCritChance, getWeaponBaseCritChance } from '$lib/getCritChance';
	import { getBaseCritMultiplier, getCritMultiplier } from '$lib/getCritMultiplier';
	import { getDamageValues } from '$lib/getDamageValues';
	import { ringsData as ringData } from '$model/ring.data';
	import clsx from 'clsx';
	import Progress from '../ui/progress/progress.svelte';
	import {
		weaponNameStore,
		enchantmentStore,
		gemsStore,
		skillsStore,
		ringStore,
		luckStore,
		blessingStore,
		speedFromFoodStore
	} from '$lib/store/calculatorOptions';
	import { weapons } from '$model/weapon.data';
	import { skillSchema, type CalculatorOptions } from '$model/calculatorOptions';
	import { getSpeedValues, weaponBaseSpeed } from '$lib/getSpeedValues';
	import CalculationResultSection from './CalculationResultSection.svelte';
	import CalculationResultProgress from './CalculationResultProgress.svelte';
	import type { Weapon } from '$model/weapon';
	import FlagText from '../ui/FlagText.svelte';

	$: activeWeaponName = $weaponNameStore.dirty || $weaponNameStore.selected;
	$: weapon = weapons.find((w) => w.name === activeWeaponName) || weapons[0];
	$: canHaveSecondaryEnchantment =
		weapon.level < 15 && !weapon.name.includes('Galaxy') && !weapon.name.includes('Infinity');
	$: enchantment = canHaveSecondaryEnchantment
		? $enchantmentStore.dirty || $enchantmentStore.selected
		: undefined;
	$: gems = [
		$gemsStore.dirty[0] || $gemsStore.selected[0],
		$gemsStore.dirty[1] || $gemsStore.selected[1],
		$gemsStore.dirty[2] || $gemsStore.selected[2]
	];
	$: skills = skillSchema.safeParse({
		lvl5: $skillsStore.dirty.lvl5 || $skillsStore.selected.lvl5,
		lvl10: $skillsStore.dirty.lvl10 || $skillsStore.selected.lvl10
	})?.data;
	$: rings = {
		left: [
			$ringStore.dirty.left[0] || $ringStore.selected.left[0],
			$ringStore.dirty.left[1] || $ringStore.selected.left[1]
		],
		right: [
			$ringStore.dirty.right[0] || $ringStore.selected.right[0],
			$ringStore.dirty.right[1] || $ringStore.selected.right[1]
		]
	};
	$: luck = $luckStore.dirty ?? $luckStore.selected;
	$: blessing = $blessingStore.dirty || $blessingStore.selected;

	$: speedFromFood = $speedFromFoodStore.dirty || $speedFromFoodStore.selected;

	type Results = {
		critDmg: { min: number; max: number };
		critMultiplier: number;
		critChance: number;
		normalAvg: number;
		avgWithCrits: number;
		dmg: { min: number; max: number };
		speed: number;
	};

	function getResults(args: CalculatorOptions): Results {
		const rings = [...(args.rings?.left || []), ...(args.rings?.right || [])]
			?.filter(Boolean)
			.map((ring) => ringData[ring]);
		const skills = args.skills;
		const gems = args.gems?.filter(Boolean) || [];
		const enchantment = args.enchantment;

		const [min, max] = getDamageValues(weapon, {
			enchantment,
			gems,
			profession: skills,
			rings
		});
		const critMultiplier = formatNumber(
			getCritMultiplier(weapon, {
				gems,
				enchantment,
				profession: args.skills,
				rings
			})
		);
		const [critMin, critMax] = [
			formatNumber(min * critMultiplier),
			formatNumber(max * critMultiplier)
		];
		const critAvg = formatNumber((critMin + critMax) / 2);
		const critChance = formatNumber(
			getCritChance(weapon, {
				gems,
				enchantment,
				profession: skills,
				rings: rings,
				luck: luck,
				blessing: args.blessing
			})
		);
		const normalAvg = formatNumber((min + max) / 2);
		const avgWithCrits = formatNumber(critAvg * critChance + normalAvg * (1 - critChance));

		const speed = getSpeedValues(args);

		return {
			dmg: { min, max },
			critDmg: { min: critMin, max: critMax },
			critMultiplier,
			critChance,
			normalAvg,
			avgWithCrits,
			speed
		};
	}

	let previousResults: Results;
	let results: Results;

	$: {
		if (results) {
			previousResults = results;
		}
		results = getResults({
			weapon: weapon.name,
			enchantment,
			skills,
			gems,
			rings,
			luck,
			blessing,
			speedFromFood
		});
	}

	$: diff = previousResults
		? {
				dmg: results.dmg.min - previousResults.dmg.min,
				critDmg: results.critDmg.min - previousResults.critDmg.min,
				critChance: results.critChance - previousResults.critChance,
				normalAvg: results.normalAvg - previousResults.normalAvg,
				avgWithCrits: results.avgWithCrits - previousResults.avgWithCrits,
				critMultiplier: results.critMultiplier - previousResults.critMultiplier
			}
		: undefined;
	const MAX_DMG = 270;

	const critMaxDmgMapping: Record<Weapon['type'], number> = {
		club: 3000,
		dagger: 1400,
		sword: 2500
	};

	const MAX_CRIT_DMG = critMaxDmgMapping[weapon?.type] || 3000;

	$: avgBaseDmg = (weapon.damage[0] + weapon.damage[1]) / 2;
	$: baseCritMultiplier = getBaseCritMultiplier(weapon);
	$: weaponBaseCritChance = getWeaponBaseCritChance(weapon);
	$: avgBaseWithCrits = avgBaseDmg + (avgBaseDmg * 1 + baseCritMultiplier * weaponBaseCritChance);
</script>

<FlagText class="mx-auto mb-2 hidden lg:flex">
	<h3 class=" text-center text-3xl">Results</h3>
</FlagText>
<div
	class="flex flex-col gap-2 border-t-3 border-surface-900 py-1 pb-[10px] font-stardew text-[22px] leading-[28px] text-black md:-ml-1 md:w-full md:gap-4 md:gap-x-10 md:border-t-0 md:p-2 md:pb-5 lg:gap-7 lg:shadow-theme-item"
>
	<CalculationResultSection>
		<div class="align-center flex flex-shrink-0 items-center gap-2">
			<img
				src="https://stardewvalleywiki.com/mediawiki/images/thumb/0/00/Attack.png/24px-Attack.png"
				alt="attack"
				class="size-5 object-cover"
			/>
			Dmg:
		</div>

		<CalculationResultProgress
			max={MAX_DMG}
			value={results.dmg.max}
			baseValue={weapon.damage[1]}
			class="bg-red-600"
		/>
		<div class="ml-auto">
			{formatNumber(results.dmg.min, 0)}-{formatNumber(results.dmg.max, 0)}
		</div>
	</CalculationResultSection>

	<CalculationResultSection>
		<div class="align-center flex flex-shrink-0 items-center gap-2">
			<img
				src="https://stardewvalleywiki.com/mediawiki/images/thumb/0/06/Crit._Power.png/24px-Crit._Power.png"
				alt="crit"
				class="size-5 object-cover"
			/>
			Crit: (x{results.critMultiplier})
		</div>

		<CalculationResultProgress
			max={MAX_CRIT_DMG}
			value={results.critDmg.min}
			baseValue={weapon.damage[0] * getBaseCritMultiplier(weapon)}
			class="bg-green-600"
		/>

		<div class="ml-auto">
			{formatNumber(results.critDmg.min)}-{formatNumber(results.critDmg.max, 0)}
		</div>
	</CalculationResultSection>
	<CalculationResultSection>
		<div class="align-center flex flex-shrink-0 items-center gap-2">
			<img
				src="https://stardewvalleywiki.com/mediawiki/images/thumb/a/a9/Crit._Chance.png/24px-Crit._Chance.png"
				alt="crit chance"
				class="mr-1 size-4 object-cover"
			/>
			Crit chance:
		</div>
		<CalculationResultProgress
			max={80}
			baseValue={getWeaponBaseCritChance(weapon) * 100}
			value={results.critChance * 100}
			class="bg-blue-400"
		/>

		<div class="ml-auto">
			{formatNumber(results.critChance * 100, 1)}%
		</div>
	</CalculationResultSection>

	<CalculationResultSection>
		<div class="align-center flex flex-shrink-0 items-center gap-2">
			<img
				src="https://stardewvalleywiki.com/mediawiki/images/thumb/2/26/Speed_w.png/24px-Speed_w.png"
				alt="speed"
				class="size-5 object-cover"
			/>

			Speed
		</div>

		<CalculationResultProgress
			max={5}
			min={1}
			value={1000 / results.speed}
			baseValue={1000 / weaponBaseSpeed(weapon)}
			class="bg-yellow-500"
		/>

		<div class="ml-auto">
			{formatNumber(1000 / results.speed, 1)} hits/s
		</div>
	</CalculationResultSection>

	<!-- <CalculationResultSection>
		<div class="align-center flex flex-shrink-0 items-center gap-2">
			<img
				src="https://stardewvalleywiki.com/mediawiki/images/thumb/0/00/Attack.png/24px-Attack.png"
				alt="attack"
				class="size-5 object-cover"
			/>
			<div>Avg</div>
		</div>

		<CalculationResultProgress
			max={1500}
			baseValue={avgBaseWithCrits}
			value={results.avgWithCrits}
			class="bg-black/30"
		/>

		<div class="ml-auto">
			{formatNumber(results.avgWithCrits, 0)}
		</div>
	</CalculationResultSection> -->

	<!-- <section
		class="md:pixel-border relative z-10 flex h-fit w-full flex-col gap-2 bg-surface-100 px-3 py-1 text-amber-900/60 md:shadow-theme"
	>
		<div class="flex items-center gap-5 text-amber-950">
			<img
				src="https://stardewvalleywiki.com/mediawiki/images/thumb/0/00/Attack.png/24px-Attack.png"
				alt="attack"
				class="size-8 object-cover"
			/>
			<div>Avg</div>
			<div class="absolute bottom-0 left-0 right-0 top-0">
				<Progress
					max={MAX_DMG}
					value={results.avgWithCrits}
					class="-z-10 h-full rounded-none  border-surface-900/10 bg-surface-800/20  "
					barClass="bg-black/30"
				/>
			</div>
			<div class="ml-auto">
				{#if isOnClient}
					{formatNumber(results.avgWithCrits, 0)}
				{/if}
			</div>
		</div>
	</section> -->
</div>
