<script lang="ts">
	import { formatNumber } from '$lib/formatNumber';
	import { getCritChance, getWeaponBaseCritChance } from '$lib/getCritChance';
	import { getBaseCritMultiplier, getCritMultiplier } from '$lib/getCritMultiplier';
	import { getDamageValues } from '$lib/getDamageValues';
	import { ringsData as ringData } from '$model/ring.data';
	import {
		weaponNameStore,
		enchantmentStore,
		gemsStore,
		skillsStore,
		ringStore,
		luckStore,
		blessingStore,
		speedFromFoodStore,
		attackFromFoodStore
	} from '$lib/store/calculatorOptions';
	import { weapons } from '$model/weapon.data';
	import { skillSchema, type CalculatorOptions } from '$model/calculatorOptions';
	import {
		ABSOLUTE_MIN_WEAPON_SPEED_IN_MILLISECONDS,
		getEffectiveSpeedLimit,
		getSpeedValues,
		weaponBaseSpeed
	} from '$lib/getSpeedValues';
	import CalculationResultSection from './CalculationResultSection.svelte';
	import CalculationResultProgress from './CalculationResultProgress.svelte';
	import type { Weapon } from '$model/weapon';
	import FlagText from '../ui/FlagText.svelte';
	import Surface from '../ui/Surface.svelte';

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

	$: attackFromFood = $attackFromFoodStore.dirty ?? $attackFromFoodStore.selected;

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
		const critMultiplier = formatNumber(
			getCritMultiplier(weapon, {
				gems,
				enchantment,
				profession: args.skills,
				rings
			})
		);

		const { min, max, minCrit, maxCrit } = getDamageValues(weapon, {
			enchantment,
			gems,
			profession: skills,
			rings,
			attackBuff: args.attackFromFood,
			critMultiplier
		});

		const critAvg = formatNumber((minCrit + maxCrit) / 2);
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
			critDmg: { min: minCrit, max: maxCrit },
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
			speedFromFood,
			attackFromFood
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
		dagger: 2000,
		sword: 2500
	};

	$: MAX_CRIT_DMG = 1600;

	$: avgBaseDmg = (weapon.damage[0] + weapon.damage[1]) / 2;
	$: baseCritMultiplier = getBaseCritMultiplier(weapon);
	$: weaponBaseCritChance = getWeaponBaseCritChance(weapon);

	$: hitsPerSec = formatNumber(1000 / results.speed, 1);

	$: dmgPerSec = formatNumber(results.avgWithCrits * hitsPerSec, 1);
</script>

<Surface
	shadow
	class="z-10 mx-[-7px] my-[-7px] mt-[-4px] border-surface-900 @container [grid-area:results] lg:mx-[-2px] lg:my-[-2px] lg:mt-[6px] lg:grid lg:items-center lg:border-l-4 lg:px-8 lg:py-10"
>
	<Surface
		class="mx-[-3px] -mb-[2px] flex snap-start flex-col items-center justify-center p-0 sm:gap-0 sm:pt-2 lg:gap-3 lg:px-3 lg:py-2 lg:pb-6"
	>
		<FlagText class="  hidden lg:mb-4 lg:flex">
			<h3 class=" text-center text-3xl">Results</h3>
		</FlagText>
		<div
			class="grid w-full grid-cols-2 flex-col gap-1 border-surface-900 py-1 pb-[8px] font-stardew text-[22px] leading-[28px] text-black sm:grid sm:w-full sm:max-w-xl sm:gap-x-10 sm:pb-8 md:-ml-1 md:w-full md:border-t-0 md:px-4 lg:flex lg:gap-2 lg:p-3 lg:pb-10"
		>
			<div class="flex flex-col gap-[inherit] lg:p-3 lg:pb-4 lg:shadow-theme-item">
				<CalculationResultSection>
					<div class="align-center flex flex-shrink-0 items-center gap-2">
						<img
							src="https://stardewvalleywiki.com/mediawiki/images/thumb/0/00/Attack.png/24px-Attack.png"
							alt="attack"
							class="size-5 object-cover"
						/>
						Dmg:
					</div>

					<div class="ml-auto">
						{formatNumber(results.dmg.min, 0)}-{formatNumber(results.dmg.max, 0)}
					</div>
					<CalculationResultProgress
						slot="progress"
						max={MAX_DMG}
						value={results.dmg.max}
						baseValue={weapon.damage[1]}
						class="bg-red-600"
					/>
				</CalculationResultSection>

				<CalculationResultSection>
					<div class="align-center flex flex-shrink-0 items-center gap-2">
						<img
							src="https://stardewvalleywiki.com/mediawiki/images/thumb/0/06/Crit._Power.png/24px-Crit._Power.png"
							alt="crit"
							class="size-5 object-cover"
						/>
						<div>
							Crit: <span class="text-[0.8em]">(x{results.critMultiplier})</span>
						</div>
					</div>

					<div class="ml-auto">
						{formatNumber(results.critDmg.min, 0)}-{formatNumber(results.critDmg.max, 0)}
					</div>
					<CalculationResultProgress
						slot="progress"
						max={MAX_CRIT_DMG}
						value={(results.critDmg.min + results.critDmg.max) / 2}
						baseValue={weapon.damage[0] * getBaseCritMultiplier(weapon)}
						class="bg-green-600"
					/>
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

					<div class="ml-auto">
						{formatNumber(results.critChance * 100, 1)}%
					</div>
					<CalculationResultProgress
						slot="progress"
						max={80}
						baseValue={getWeaponBaseCritChance(weapon) * 100}
						value={results.critChance * 100}
						class="bg-blue-400"
					/>
				</CalculationResultSection>
			</div>
			<div class="flex flex-col gap-[inherit] lg:mt-10 lg:p-3 lg:pb-4 lg:shadow-theme-item">
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
						slot="progress"
						max={1000 / ABSOLUTE_MIN_WEAPON_SPEED_IN_MILLISECONDS}
						min={1}
						cap={1000 / getEffectiveSpeedLimit(weapon)}
						value={1000 / results.speed}
						baseValue={1000 / weaponBaseSpeed(weapon)}
						class="bg-slate-400"
					/>

					<div class="ml-auto">
						{hitsPerSec} hits/s
					</div>
				</CalculationResultSection>
				<CalculationResultSection class="w-full">
					<div class="align-center flex flex-shrink-0 items-center gap-2">
						<img
							src="https://stardewvalleywiki.com/mediawiki/images/thumb/0/00/Attack.png/24px-Attack.png"
							alt="attack"
							class="size-5 object-cover"
						/>
						<div>Dps (dmg/s)</div>
					</div>

					<div class="ml-auto">
						{formatNumber(dmgPerSec, 0)}
					</div>
					<CalculationResultProgress
						slot="progress"
						max={7000}
						baseValue={0}
						value={dmgPerSec}
						class="bg-[#fa9305]"
					/>
				</CalculationResultSection>
			</div>
		</div>
	</Surface>
</Surface>
