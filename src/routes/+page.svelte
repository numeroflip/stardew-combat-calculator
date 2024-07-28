<script lang="ts">
	import { weapons } from '../model/weapon.data';
	import { rings } from '../model/ring.data';
	import { innateEnchantment, type GuaranteedInnateEnchantment } from '../model/enchantment';
	import type { GemName } from '../model/gem';
	import {
		type CombatProfession,
		type ScoutSpecialization,
		type FighterSpecialization,
		combatProfessionLines
	} from '../model/profession';
	import { getCritMultiplier } from '$lib/getCritMultiplier';
	import { getCritChance } from '$lib/getCritChance';
	import { formatNumber } from '$lib/formatNumber';
	import { getDamageValues } from '$lib/getDamageValues';
	import GemPicker from '$lib/components/GemPicker.svelte';
	import type { Weapon } from '$model/weapon';
	import RingPairPicker from '$lib/components/RingPairPicker.svelte';
	import WeaponPicker from '$lib/components/WeaponPicker.svelte';
	import EnchantmentPicker from '$lib/components/EnchantmentPicker.svelte';

	let weaponName = weapons[0].name;
	$: weapon = weapons.find((weapon) => weapon.name === weaponName) as Weapon;
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

	let enchantmentKey: GuaranteedInnateEnchantment;
	let enchantmentValue: number;
	$: enchantmentValueOptions = enchantmentKey
		? [...innateEnchantment.guaranteed[enchantmentKey].options.map((i) => i.name)]
		: null;

	let enchantment;

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
			enchantmentKey &&
			enchantmentValueOptions &&
			enchantmentValueOptions.includes(enchantmentValue);
		if (!isEnchantmentValueValid) {
			enchantmentValue = 0;
		}
	}

	$: profession = { line: lvl5Profession, specialization: lvl10Profession || undefined };
	$: enchantment = { name: enchantmentKey, value: enchantmentValue };

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
	class=" h-full px-0 mx-auto flex flex-col my-10 justify-center items-center container max-w-6xl pixel-corners-border--lg bg-[#F4D497]"
>
	<div class="border-b-[6px] w-full py-4 bg-amber-200/50 border-[#7a482a]">
		<h1 class="h1 text-5xl text-center capitalize">Stardew Combat calculator</h1>
	</div>
	<div class="space-y-5 pt-10">
		<form class="flex flex-col gap-10">
			<!-- WEAPON -->
				<div class="grid grid-cols-2 gap-10 py-10 px-10">
					<div class="flex flex-col gap-7">
						<WeaponPicker bind:weaponName />
						
		
					</div>

					<section
						class="p-4 h-fit rounded pixel-border flex flex-col gap-2 text-amber-900/60 text-3xl bg-amber-50 w-fit"
					>
						<div class="flex items-center gap-2">
							<img
								src="https://stardewvalleywiki.com/mediawiki/images/thumb/0/00/Attack.png/24px-Attack.png"
								alt="attack"
								class="size-5 object-cover"
							/>
							Normal Dmg:
							<div class="ml-auto">
								{min}-{max}
							</div>
						</div>
						<div class="flex items-center gap-2">
							<img
								src="https://stardewvalleywiki.com/mediawiki/images/thumb/0/06/Crit._Power.png/24px-Crit._Power.png"
								alt="crit"
								class="size-5 object-cover"
							/>
							Crit Dmg:
							<div class="ml-auto">
								{formatNumber(min * critMultiplier)}-{formatNumber(max * critMultiplier)}
							</div>
						</div>

						<div class="flex">
							Crit chance: <div class="ml-auto">{formatNumber(critChance * 100)}%</div>
						</div>

						<div
							class="flex items-center gap-5 text-4xl border-t-2 text-amber-950 border-amber-900 pt-2"
						>
							<img
								src="https://stardewvalleywiki.com/mediawiki/images/thumb/0/00/Attack.png/24px-Attack.png"
								alt="attack"
								class="size-8 object-cover"
							/>
							<div>
								Avg dmg:<span class="opacity-35 text-2xl self-center mx-2">(with crits)</span>
							</div>
							<div class="ml-auto">{formatNumber(avgWithCrits, 0)}</div>
						</div>
					</section>


					<section class="flex w-fit flex-col gap-4">
						<h3 class="text-3xl">Gems</h3>
						<div class="flex gap-4">
							<GemPicker bind:value={selectedGems[0]} />
							<GemPicker bind:value={selectedGems[1]} />
							<GemPicker bind:value={selectedGems[2]} />
						</div>
					</section>
					{#if canBeEnchanted}
							<section>
								<h3 class="text-3xl mb-4">Innate Enchantment</h3>
								<EnchantmentPicker
									bind:enchantmentKey
									bind:enchantmentOptionName={enchantmentValue}
								/>
							</section>
							{:else}
							<div />
						{/if}
						<section class=" flex w-fit flex-col gap-4">
							<h3 class="text-3xl">Rings</h3>
							<fieldset class=" flex gap-3">
								<RingPairPicker bind:value={selectedRings.left} />
								<RingPairPicker bind:value={selectedRings.right} />
							</fieldset>
						</section>
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
				</div>

			<!-- PROFESSION -->
			
		</form>
	</div>
</div>
