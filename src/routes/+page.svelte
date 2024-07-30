<script lang="ts">
	import { weapons } from '../model/weapon.data';
	import { rings } from '../model/ring.data';
	import type { GemName } from '../model/gem';
	import { type SelectedProfession } from '../model/profession';

	import GemPicker from '$lib/components/GemPicker.svelte';
	import type { Weapon } from '$model/weapon';
	import RingPairPicker from '$lib/components/RingPairPicker.svelte';
	import WeaponPicker from '$lib/components/WeaponPicker.svelte';
	import EnchantmentPicker from '$lib/components/EnchantmentPicker.svelte';
	import SkillPicker from '$lib/components/SkillPicker.svelte';
	import CalculationResults from '$lib/components/CalculationResults.svelte';
	import type { GuaranteedInnateEnchantment } from '$model/enchantment';
	import LuckFromFoodPicker from '$lib/components/LuckFromFoodPicker.svelte';

	let weapon = weapons[0];
	let focusedWeapon: Weapon | undefined;

	let selectedGems: [GemName | undefined, GemName | undefined, GemName | undefined] = [
		undefined,
		undefined,
		undefined
	];

	let focusedGems: [GemName | undefined, GemName | undefined, GemName | undefined] = [
		undefined,
		undefined,
		undefined
	];

	$: shownGems = [
		focusedGems[0] || selectedGems[0],
		focusedGems[1] || selectedGems[1],
		focusedGems[2] || selectedGems[2]
	];

	type RingKey = keyof typeof rings;

	let selectedRings: {
		left: [RingKey | undefined, RingKey | undefined];
		right: [RingKey | undefined, RingKey | undefined];
	} = {
		left: [undefined, undefined],
		right: [undefined, undefined]
	};

	let focusedRings: {
		left: [RingKey | undefined, RingKey | undefined];
		right: [RingKey | undefined, RingKey | undefined];
	} = {
		left: [undefined, undefined],
		right: [undefined, undefined]
	};

	let enchantment: { key: GuaranteedInnateEnchantment; optionName: number } | undefined;
	let focusedEnchantment: { key: GuaranteedInnateEnchantment; optionName: number } | undefined;
	$: shownEnchantment = focusedEnchantment || enchantment;

	let skills: SelectedProfession = {};

	$: canBeEnchanted =
		weapon.level < 15 && !weapon.name.includes('Galaxy') && !weapon.name.includes('Infinity');

	$: shownRings = {
		left: focusedRings.left.map((ringKey, index) => ringKey || selectedRings.left[index]),
		right: focusedRings.right.map((ringKey, index) => ringKey || selectedRings.right[index])
	};

	let luckFromFood: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0;

	$: shownRingsFlat = Object.values(shownRings)
		.flat()
		.filter(Boolean)
		.map((ringKey) => rings[ringKey as RingKey]);

	$: shownWeapon = focusedWeapon || weapon;

	let hasBlessingOfFangs = false;
</script>

<div
	class="h-full px-0 mx-auto flex flex-col justify-center items-center mt-10 container w-full max-w-5xl pixel-corners-border--lg bg-[#F4D497]"
>
	<div class="border-b-[6px] w-full py-4 bg-amber-200/50 border-[#7a482a]">
		<h1 class="h1 text-5xl text-center capitalize">Stardew Combat calculator</h1>
	</div>
	<div class="space-y-5 w-full pt-5">
		<form class="flex w-full flex-col gap-10">
			<!-- WEAPON -->
			<div class="grid md:grid-cols-2 gap-10 py-10 px-10">
				<div class="flex flex-col gap-7">
					<section class="flex flex-wrap flex-col w-full gap-3">
						<h3 class="text-3xl">Weapon</h3>
						<div class="flex gap-4 w-full">
							<WeaponPicker bind:weapon bind:focusedWeapon />
						</div>
					</section>
					<section class="flex flex-wrap items-center justify-between w-full gap-10">
						<h3 class="text-3xl">Gems</h3>
						<div class="flex gap-4">
							<GemPicker bind:gem={selectedGems[0]} bind:focusedGem={focusedGems[0]} />
							<GemPicker bind:gem={selectedGems[1]} bind:focusedGem={focusedGems[1]} />
							<GemPicker bind:gem={selectedGems[2]} bind:focusedGem={focusedGems[2]} />
						</div>
					</section>

					{#if canBeEnchanted}
						<section class="flex items-center flex-wrap justify-between w-full gap-5">
							<h3 class="text-3xl inline">Innate Enchantment</h3>
							<EnchantmentPicker bind:enchantment bind:focusedEnchantment />
						</section>
					{/if}
					<section class=" flex justify-between flex-wrap w-full items-center gap-10">
						<h3 class="text-3xl">Rings</h3>
						<fieldset class=" flex gap-3">
							<RingPairPicker
								bind:value={selectedRings.left}
								bind:focusedRings={focusedRings.left}
							/>
							<RingPairPicker
								bind:value={selectedRings.right}
								bind:focusedRings={focusedRings.right}
							/>
						</fieldset>
					</section>
					<section class="flex items-center flex-wrap justify-between w-full gap-10">
						<h3 class="text-3xl">Skills</h3>

						<SkillPicker bind:skills />
					</section>

					<section class="flex items-center flex-wrap justify-between w-full gap-10">
						<h3 class="text-3xl">Luck (from food)</h3>

						<LuckFromFoodPicker bind:luck={luckFromFood} />
					</section>

					<section class="flex items-center flex-wrap justify-between w-full gap-10">
						<h3 class="text-3xl">Blessing of Fangs</h3>

						<input type="checkbox" bind:checked={hasBlessingOfFangs} />
					</section>
				</div>
				<section class="flex flex-col w-full gap-3">
					<h3 class="text-3xl">Results</h3>
					<CalculationResults
						weapon={shownWeapon}
						enchantment={canBeEnchanted ? shownEnchantment : undefined}
						gems={shownGems.filter(Boolean)}
						rings={shownRingsFlat}
						skills={skills || undefined}
						{hasBlessingOfFangs}
						luck={luckFromFood}
					/>
				</section>

				<div />
			</div>
		</form>
	</div>
</div>
