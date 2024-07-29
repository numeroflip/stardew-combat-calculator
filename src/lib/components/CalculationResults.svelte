<script lang="ts">
	import { formatNumber } from '$lib/formatNumber';
	import { getCritChance } from '$lib/getCritChance';
	import { getCritMultiplier } from '$lib/getCritMultiplier';
	import { getDamageValues } from '$lib/getDamageValues';
	import type { GuaranteedInnateEnchantment, SelectedEnchantment } from '$model/enchantment';
	import type { GemName } from '$model/gem';
	import type {
		CombatProfession,
		FighterSpecialization,
		ScoutSpecialization
	} from '$model/profession';
	import type { Ring } from '$model/ring';
	import type { Weapon } from '$model/weapon';

	type $$Props = {
		weapon: Weapon;
		enchantment?: SelectedEnchantment;
		skills?: {
			lvl5: CombatProfession['line'];
			lvl10: FighterSpecialization | ScoutSpecialization;
		};
		gems?: GemName[];
		rings?: Ring[];
		luck?: number;
		hasBlessingOfFangs?: boolean;
	};

	export let weapon: $$Props['weapon'];
	export let enchantment: $$Props['enchantment'] = undefined;
	export let skills: $$Props['skills'] = undefined;
	export let gems: $$Props['gems'] = undefined;
	export let rings: $$Props['rings'] = undefined;
	export let luck: $$Props['luck'] = 0;
	export let hasBlessingOfFangs: $$Props['hasBlessingOfFangs'] = false;

	$: profession = { line: skills?.lvl5, specialization: skills?.lvl10 || undefined };

	$: critMultiplier = formatNumber(
		getCritMultiplier(weapon, {
			gems: gems,
			enchantment: enchantment,
			/* @ts-expect-error */
			profession: profession,
			rings: rings
		})
	);

	$: critChance = formatNumber(
		getCritChance(weapon, {
			gems,
			enchantment,
			/* @ts-expect-error */
			profession,
			rings: rings,
			luck: luck,
			hasBlessingOfFangs
		})
	);

	$: [min, max] = getDamageValues(weapon, {
		enchantment: enchantment,
		gems: gems,
		/* @ts-expect-error */
		profession,
		rings: rings
	});

	$: normalAvg = formatNumber((min + max) / 2);
	$: [critMin, critMax] = [formatNumber(min * critMultiplier), formatNumber(max * critMultiplier)];
	$: critAvg = formatNumber((critMin + critMax) / 2);
	$: avgWithCrits = formatNumber(critAvg * critChance + normalAvg * (1 - critChance));
</script>

<section
	class="p-4 h-fit w-full rounded pixel-border flex flex-col gap-2 text-amber-900/60 text-3xl bg-amber-50"
>
	<div class="flex items-center gap-2">
		<img
			src="https://stardewvalleywiki.com/mediawiki/images/thumb/0/00/Attack.png/24px-Attack.png"
			alt="attack"
			class="size-5 object-cover"
		/>
		Normal Dmg:
		<div class="ml-auto">
			{formatNumber(min, 0)}-{formatNumber(max, 0)}
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
			{formatNumber(min * critMultiplier, 0)}-{formatNumber(max * critMultiplier, 0)}
		</div>
	</div>

	<div class="flex">
		Crit chance: <div class="ml-auto">{formatNumber(critChance * 100, 1)}%</div>
	</div>

	<div class="flex items-center gap-5 text-4xl border-t-2 text-amber-950 border-amber-900 pt-2">
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
