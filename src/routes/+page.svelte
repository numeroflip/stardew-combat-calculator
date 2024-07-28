<script lang="ts">
	import { weapons } from '../model/weapon.data';
	import { rings } from '../model/ring.data';
	import { innateEnchantment, type GuaranteedInnateEnchantment } from '../model/enchantment';
	import type { GemName } from '../model/gem';
	import { gem as selectableGem } from '../model/gem.data';
	import {
		type CombatProfession,
		type ScoutSpecialization,
		type FighterSpecialization,
		combatProfessionLines
	} from '../model/profession';
	import { getCritMultiplier } from '$lib/getCritMultiplier';
	import type { Ring } from '../model/ring';
	import { getCritChance } from '$lib/getCritChance';
	import { formatNumber } from '$lib/formatNumber';
	import { getDamageValues } from '$lib/getDamageValues';
	import GemPicker from '$lib/components/GemPicker.svelte';
	import RingPicker from '$lib/components/RingPicker.svelte';

	const ringArray = Object.values(rings);

	let weapon = weapons[0];
	let selectedGems: [GemName | undefined, GemName | undefined, GemName | undefined] = [
		undefined,
		undefined,
		undefined
	];

	type RingKey = keyof typeof rings;

	let selectedRings: {
		left: [RingKey | undefined, RingKey | undefined];
		right: [RingKey | undefined, RingKey | undefined];
	} = {
		left: [undefined, undefined],
		right: [undefined, undefined]
	};

	let enchantmentName: GuaranteedInnateEnchantment;
	let enchantmentValue: number;
	$: enchantmentValueOptions = enchantmentName
		? [...innateEnchantment.guaranteed[enchantmentName].options.map((i) => i.name)]
		: null;

	let lvl5Profession: CombatProfession['line'];
	let lvl10Profession: FighterSpecialization | ScoutSpecialization | null;
	$: lvl10ProfessionOptions =
		lvl5Profession === 'fighter'
			? ['brute', 'defender']
			: lvl5Profession === 'scout'
				? ['acrobat', 'desperado']
				: null;

	$: {
		if (!lvl5Profession) {
			lvl10Profession = null;
		} else {
			/* @ts-expect-error */
			if (!lvl10ProfessionOptions?.includes(lvl10Profession)) {
				lvl10Profession = null;
			}
		}
	}

	$: canBeEnchanted =
		weapon.level < 15 && !weapon.name.includes('Galaxy') && !weapon.name.includes('Infinity');

	$: {
		const isEnchantmentValueValid =
			enchantmentName &&
			enchantmentValueOptions &&
			enchantmentValueOptions.includes(enchantmentValue);
		if (!isEnchantmentValueValid) {
			enchantmentValue = 0;
		}
	}

	$: profession = { line: lvl5Profession, specialization: lvl10Profession || undefined };
	$: enchantment = { name: enchantmentName, value: enchantmentValue };

	$: selectedRingsFlat = Object.values(selectedRings)
		.flat()
		.filter(Boolean)
		.map((ringKey) => rings[ringKey as RingKey]);

	$: critMultiplier = formatNumber(
		getCritMultiplier(weapon, {
			gems: selectedGems.filter(Boolean) as GemName[],
			enchantment: canBeEnchanted ? enchantment : undefined,
			/* @ts-expect-error */
			profession: profession,
			rings: selectedRingsFlat
		})
	);

	function capitalize(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	$: critChance = formatNumber(
		getCritChance(weapon, {
			gems: selectedGems.filter(Boolean) as GemName[],
			enchantment: canBeEnchanted ? enchantment : undefined,
			/* @ts-expect-error */
			profession: profession,
			rings: selectedRingsFlat
		})
	);

	$: [min, max] = getDamageValues(weapon, {
		enchantment: canBeEnchanted ? enchantment : undefined,
		gems: selectedGems.filter(Boolean) as GemName[],
		/* @ts-expect-error */
		profession,
		rings: selectedRingsFlat
	});
	$: normalAvg = formatNumber((min + max) / 2);
	$: [critMin, critMax] = [formatNumber(min * critMultiplier), formatNumber(max * critMultiplier)];
	$: critAvg = formatNumber((critMin + critMax) / 2);
	$: avgWithCrits = formatNumber(critAvg * critChance + normalAvg * (1 - critChance));
</script>

<div
	class=" h-full py-10 mx-auto flex my-10 justify-center items-center container max-w-6xl pixel-corners-border--lg bg-[#F4D497]"
>
	<div class="space-y-5">
		<h1 class="h1 text-6xl text-center capitalize ">Stardew Combat calculator</h1>

		<form class="flex flex-col gap-10 ">
			<!-- WEAPON -->
			<div class="mt-5 p-4">
				<div class="flex gap-10">
					<div class="flex flex-col gap-5">
						<section
							class="p-4 min-w-80 rounded pixel-border flex flex-col gap-2 text-3xl bg-white w-fit"
						>
							<section class="mb-5">
								<label for="weapon">Weapon</label>
								<select id="weapon" bind:value={weapon} name="weapon">
									{#each weapons as weapon}
										<option value={weapon}>{weapon.name}</option>
									{/each}
								</select>
							</section>
							<div class="text-neutral-500">
								<div>
									Level: {weapon.level}
								</div>
								<div>
									Damage: {weapon.damage[0]} - {weapon.damage[1]}
								</div>

								<div>
									Base crit chance: {weapon.critStrikeChance * 100}%
								</div>
							</div>
						</section>

						<section
							class="p-4 min-w-80 rounded pixel-border flex flex-col gap-2 border-amber-800 text-3xl bg-white w-fit"
						>
							<div>
								Damage: {min} - {max}
							</div>

							<div>
								Crit chance: {formatNumber(critChance * 100)}%
							</div>
							<div>
								Crit multiplier: {critMultiplier}
							</div>
							<div>
								Crit: {formatNumber(min * critMultiplier)} - {formatNumber(max * critMultiplier)}
							</div>
							<div>
								Avg with crits: {avgWithCrits}
							</div>
						</section>
					</div>
					<div>
						<h3 class="text-4xl text-center mb-5">Gems</h3>
							<div class="flex gap-4">
								<GemPicker bind:value={selectedGems[0]} />
								<GemPicker bind:value={selectedGems[1]} />
								<GemPicker bind:value={selectedGems[2]} />
							</div>
						
					</div>
				</div>
			</div>

			<!-- PROFESSION -->
			<section class="flex gap-4 text-3xl p-4">
				<div>
					<label for="profession">Lvl 5 Skill</label>
					<select id="profession" bind:value={lvl5Profession} name="profession">
						<option value=""></option>
						{#each combatProfessionLines as line}
							<option value={line}>{capitalize(line)}</option>
						{/each}
					</select>
				</div>
				<div>
					<label for="enchantment">Lvl 10 Skill</label>
					<select
						id="enchantment"
						bind:value={lvl10Profession}
						disabled={!lvl5Profession}
						name="enchantment"
					>
						<option value=""></option>
						{#each lvl10ProfessionOptions || [] as option}
							<option value={option}>{capitalize(option)}</option>
						{/each}
					</select>
				</div>
			</section>

			<section class=" flex gap-4 p-4 ">
				<fieldset>
					<!-- RINGS -->
					{#each selectedRings.left as ring, index}
						<div>
							<RingPicker bind:value={selectedRings.left[index]} />
						</div>
					{/each}
				</fieldset>

				<fieldset class=" flex gap-4 p-4">
					<!-- RINGS -->
					{#each selectedRings.right as ring, index}
						<div>
							<RingPicker bind:value={selectedRings.right[index]} />
						</div>
					{/each}
				</fieldset>
			</section>

			{#if canBeEnchanted}
				<!-- ENCHANTMENT -->
				<section class="flex gap-4 p-4 text-3xl">
					<div>
						<label for="enchantment">Enchantment</label>
						<select id="enchantment" bind:value={enchantmentName} name="enchantment">
							<option value=""></option>
							{#each Object.entries(innateEnchantment.guaranteed) as [enchantmentKey, enchantment]}
								<option value={enchantmentKey}>{enchantment.name}</option>
							{/each}
						</select>
					</div>
					<div>
						<label for="enchantmentValue">Enchantment Value</label>
						<select
							id="enchantmentValue"
							disabled={!enchantmentName}
							bind:value={enchantmentValue}
							name="enchantmentValue"
						>
							<option value=""></option>
							{#each enchantmentValueOptions || [] as option}
								<option value={option}>{option}</option>
							{/each}
						</select>
					</div>
				</section>
			{/if}
		</form>
	</div>
</div>
