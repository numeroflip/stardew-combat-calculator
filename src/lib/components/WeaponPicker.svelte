<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { weapons, swords, clubs, daggers } from '$model/weapon.data';

	export let weapon: Weapon;
	export let focusedWeapon: Weapon | undefined = undefined;

	const orderedSwords = swords.toSorted((a, b) => b.level - a.level);
	const orderedDaggers = daggers.toSorted((a, b) => b.level - a.level);
	const orderedClubs = clubs.toSorted((a, b) => b.level - a.level);

	$: activeTab = weapon.type;

	$: shownWeapon = focusedWeapon || weapon;

	import * as Tabs from '$lib/components/ui/tabs';
	import type { Weapon, WeaponType } from '$model/weapon';

	const tabs = [
		{
			value: 'dagger',
			name: 'Daggers',
			icon: orderedDaggers[11].icon,
			list: orderedDaggers
		},
		{
			value: 'sword',
			name: 'Swords',
			icon: orderedSwords[4].icon,
			list: orderedSwords
		},
		{
			value: 'club',
			name: 'Clubs',
			icon: orderedClubs[3].icon,
			list: orderedClubs
		}
	];
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			class=" pixel-corners w-full h-fit px-10 gap-3 rounded-sm bg-amber-50    p-6 flex items-center justify-center "
			variant="outline"
		>
			{#if weapon}
				<div class="flex w-full flex-col">
					<div class="text-4xl flex flex-col gap-5 text-center">
						<div class="text-left gap-5 text-2xl flex">
							<div class="shrink-0 relative size-20 flex justify-center items-center">
								<img
									src={shownWeapon.icon}
									alt={shownWeapon.name}
									class=" size-15 object-cover content-center"
								/>
								<span class="absolute top-0 left-0 opacity-70">{shownWeapon.level}</span>
							</div>
							<div>
								{shownWeapon.name}
								<div class="grid w-full text-amber-950/40 grid-cols-[1fr_auto] gap-x-5">
									<div>Dmg:</div>
									<div class="text-end">
										{shownWeapon.damage[0]}-{shownWeapon.damage[1]}
									</div>

									<div>Base crit chance:</div>
									<div class="text-end">
										{shownWeapon.critStrikeChance * 100}%
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content
		sideOffset={10}
		class="w-fit relative min-w-80 bg-white/50 backdrop-blur-md pixel-border      "
	>
		<Tabs.Root bind:value={activeTab}>
			<Tabs.List class=" flex bg-transparent rounded-none h-fit border-b-2 border-amber-950">
				{#each tabs as tab}
					<Tabs.Trigger class="text-xl bg-transparent" value={tab.value}
						>{tab.name} <img src={tab.icon} alt={tab.name} class=" size-10" /></Tabs.Trigger
					>
				{/each}
			</Tabs.List>

			<DropdownMenu.Group class="flex w-full max-h-[40vh] overflow-y-auto gap-4">
				{#each tabs as tab}
					<Tabs.Content class="w-full" value={tab.value}>
						{#each tab.list as _weapon}
							<DropdownMenu.Item
								on:click={() => (weapon = _weapon)}
								on:focusin={() => (focusedWeapon = _weapon)}
								class="mr-0 w-full flex gap-2 cursor-pointer p-2 pl-2"
							>
								<div class="relative">
									<img src={_weapon.icon} alt={_weapon.name} class=" size-10" />
									<span class="absolute -top-1 -left-1 leading-3 text-sm opacity-30"
										>{_weapon.level}</span
									>
								</div>
								<div class="text-2xl flex w-full justify-between items-center">
									{_weapon.name}
									<span class=" ml-2 opacity-30">{_weapon.damage[0]}-{_weapon.damage[1]}</span>
								</div>
							</DropdownMenu.Item>
						{/each}
					</Tabs.Content>
				{/each}
			</DropdownMenu.Group>
		</Tabs.Root>
	</DropdownMenu.Content>
</DropdownMenu.Root>
