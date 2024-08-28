<script lang="ts">
	import { formatNumber } from '$lib/formatNumber';
	import { getCritChance } from '$lib/getCritChance';
	import { getCritMultiplier } from '$lib/getCritMultiplier';
	import { getDamageValues } from '$lib/getDamageValues';
	import { rings as ringData } from '$model/ring.data';
	import clsx from 'clsx';
	import Progress from './ui/progress/progress.svelte';
	import {
		weaponNameStore,
		enchantmentStore,
		gemsStore,
		skillsStore,
		ringStore,
		luckStore,
		hasBlessingOfFangsStore
	} from '$lib/store/calculatorOptions';
	import { weapons } from '$model/weapon.data';
	import { skillSchema, type CalculatorOptions } from '$model/calculatorOptions';

	$: activeWeaponName = $weaponNameStore.dirty || $weaponNameStore.selected;
	$: weapon = weapons.find((w) => w.name === activeWeaponName) || weapons[0];
	$: enchantment = $enchantmentStore.dirty || $enchantmentStore.selected;
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
	$: hasBlessingOfFangs = $hasBlessingOfFangsStore.dirty || $hasBlessingOfFangsStore.selected;

	type Results = {
		critDmg: { min: number; max: number };
		critMultiplier: number;
		critChance: number;
		normalAvg: number;
		avgWithCrits: number;
		dmg: { min: number; max: number };
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
				hasBlessingOfFangs
			})
		);
		const normalAvg = formatNumber((min + max) / 2);
		const avgWithCrits = formatNumber(critAvg * critChance + normalAvg * (1 - critChance));

		return {
			dmg: { min, max },
			critDmg: { min: critMin, max: critMax },
			critMultiplier,
			critChance,
			normalAvg,
			avgWithCrits
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
			hasBlessingOfFangs
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
	const MAX_DMG = 300;
</script>

<div
	class="flex flex-col gap-1 divide-red-600 border-t-3 border-surface-900 text-2xl md:max-w-80 md:gap-2"
>
	<section
		class={clsx(
			'relative  h-fit px-3 py-1 ',
			'flex  w-full flex-col gap-2 bg-surface-100   text-surface-950 md:shadow-theme'
		)}
	>
		<div class="z-10 flex items-center gap-2">
			<div class="align-center flex flex-shrink-0 items-center">
				<img
					src="https://stardewvalleywiki.com/mediawiki/images/thumb/0/00/Attack.png/24px-Attack.png"
					alt="attack"
					class="size-5 object-cover"
				/>
				Dmg:
			</div>
			<div class="absolute bottom-0 left-0 right-0 top-0">
				<Progress
					max={MAX_DMG}
					value={results.dmg.max}
					class="-z-10 h-full rounded-none border-surface-900/10 bg-surface-800/20  "
					barClass="bg-red-600/30"
				/>
			</div>
			<div class="ml-auto">
				{formatNumber(results.dmg.min, 0)}-{formatNumber(results.dmg.max, 0)}
			</div>
		</div>
	</section>

	<section
		class="relative z-10 flex items-center gap-2 bg-surface-100 px-3 py-1 text-amber-900 md:shadow-theme"
	>
		<div class="align-center flex flex-shrink-0 items-center">
			<img
				src="https://stardewvalleywiki.com/mediawiki/images/thumb/0/06/Crit._Power.png/24px-Crit._Power.png"
				alt="crit"
				class="size-5 object-cover"
			/>
			Crit: (x{results.critMultiplier})
		</div>

		<div class="absolute bottom-0 left-0 right-0 top-0">
			<Progress
				max={3000}
				value={results.critDmg.min}
				class="-z-10 h-full rounded-none border-surface-900/10 bg-surface-800/20  "
				barClass="bg-green-600/30"
			/>
		</div>
		<div class="ml-auto">
			{formatNumber(results.critDmg.min)}-{formatNumber(results.critDmg.max, 0)}
		</div>
	</section>
	<section
		class="relative z-10 mb-2 flex items-center gap-2 bg-surface-100 px-3 py-0 text-xl text-amber-900/80 md:shadow-theme"
	>
		Crit chance:
		<div class="absolute bottom-0 left-0 right-0 top-0">
			<Progress
				max={100}
				value={results.critChance * 100}
				class="-z-10 h-full rounded-none  border-surface-900/10 bg-surface-800/20  "
				barClass="bg-blue-400/30"
			/>
		</div>
		<div class="ml-auto">
			{formatNumber(results.critChance * 100, 1)}%
		</div>
	</section>
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
