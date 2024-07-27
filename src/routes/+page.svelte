<script lang="ts">
	import { weapons } from '../model/weapon.data';
	import { rings } from '../model/ring.data';
	import { gems } from '../model/gem.data';
	import { innateEnchantment, type GuaranteedInnateEnchantment } from '../model/enchantment';
	import type { GemName } from '../model/gem';
	import {
		type CombatProfession,
		type ScoutSpecialization,
		type FighterSpecialization,
		combatProfessionLines
	} from '../model/profession';
	import { getCritMultiplier } from '$lib/getCritMultiplier';
	import type { Ring } from '../model/ring';
	import { getCritChance } from '$lib/getCritChance';
	const ringArray = Object.values(rings);

	let weapon = weapons[0];
	let selectedGems: [GemName | null, GemName | null, GemName | null] = [null, null, null];


	let selectedRings: [Ring | null, Ring | null, Ring | null, Ring | null] = [null, null, null, null]
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

	$: {
		
			const isEnchantmentValueValid = enchantmentName && enchantmentValueOptions && enchantmentValueOptions.includes(enchantmentValue)
			if (!isEnchantmentValueValid) {
				enchantmentValue = 0;
			}
			
		
	}

	$:profession = { line: lvl5Profession, specialization: lvl10Profession || undefined};
	$:enchantment = {name: enchantmentName, value: enchantmentValue}

	$: critMultiplier = Math.round(getCritMultiplier(weapon, {
		gems: selectedGems.filter(Boolean) as GemName[],
		enchantment: enchantment,
		/* @ts-expect-error */
		profession: profession,
		rings: selectedRings.filter(Boolean) as Ring[],
	})*10000) / 10000

	function capitalize(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	$: critChance = Math.round(getCritChance(weapon, {
		gems: selectedGems.filter(Boolean) as GemName[],
		enchantment: enchantment,
		/* @ts-expect-error */
		profession: profession,
		rings: selectedRings.filter(Boolean) as Ring[],
	}) *10000) / 10000
</script>

<div class=" h-full py-10 mx-auto flex justify-center items-center bg-transparent">
	<div class="space-y-5">
		<h1 class="h1">Stardew Combat stat calculator</h1>

		<form class="flex flex-col gap-10">
			<!-- WEAPON -->
			<div class="mt-5 p-4">
				<label for="weapon">Weapon</label>
				<select id="weapon" bind:value={weapon} name="weapon">
					{#each weapons as weapon}
						<option value={weapon}>{weapon.name}</option>
					{/each}
				</select>
				<section class="p-4 border text-sm bg-white w-fit my-4">
					<div>
						Level: {weapon.level}
					</div>
					<div>
						Damage: {weapon.damage[0]} - {weapon.damage[1]}
					</div>
					<div>
						Base crit chance: {weapon.critStrikeChance * 100}%
					</div>
					<section class="bg-yellow-200/50">
						<div>
							Crit  chance: {critChance * 100}%
						</div>
						<div>
							Crit  multiplier: {critMultiplier}
						</div>

					</section>
				</section>
			</div>

			<!-- PROFESSION -->
			<section class="flex gap-4 p-4">
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

			<section class=" flex gap-4 p-4">
				<!-- RINGS -->
				 {#each selectedRings as ring, index }
				 <div>
					 <label for={`ring${index}`}>Ring 1</label>
					 <select id={`ring${index}`} bind:value={selectedRings[index]} name={`ring${index}`}>
						 <option value=""></option>
						 {#each ringArray as _ring}
							 <option value={_ring}>{_ring.name}</option>
						 {/each}
					 </select>
				 </div>

					
				 {/each}
				
			</section>

			<!-- ENCHANTMENT -->
			<section class="flex gap-4 p-4">
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

			<!-- GEMS -->
			<section class="flex gap-4 p-4">
				{#each selectedGems as gem, index}
					<div>
						<label for={`gem${index}`}>Gem {index}</label>
						<select id={`gem${index}`} bind:value={selectedGems[index]} name={`gem${index}`}>
							<option value=""></option>
							{#each Object.keys(gems) as _gem}
								<option value={_gem}>{capitalize(_gem)}</option>
							{/each}
						</select>
					</div>
				{/each}
			</section>
		</form>
	</div>
</div>
