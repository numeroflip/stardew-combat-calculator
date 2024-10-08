<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { swords, clubs, daggers, weapons } from '$model/weapon.data';
	import * as Tabs from '$lib/components/ui/tabs';
	import { weaponNameStore } from '$lib/store/calculatorOptions';
	import clsx from 'clsx';

	const orderedSwords = swords.toSorted((a, b) => b.level - a.level);
	const orderedDaggers = daggers.toSorted((a, b) => b.level - a.level);
	const orderedClubs = clubs.toSorted((a, b) => b.level - a.level);

	let open = false;
	$: if (open === false) {
		weaponNameStore.clearDirty();
	}

	$: activeWeaponName = $weaponNameStore.dirty || $weaponNameStore.selected;
	$: weapon = weapons.find((w) => w.name === activeWeaponName);

	$: weaponType = weapon?.type;

	let activeTab = weapon?.type;

	$: {
		activeTab = weaponType;
	}

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

	const imageSize = 'md:size-15 size-9';
</script>

<DropdownMenu.Root bind:open>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="default"
			class=" relative flex h-fit w-full shrink-0 items-center justify-center self-center rounded-none border-none  p-3 py-0 shadow-theme-item"
		>
			{#if weapon}
				<div class="flex w-full shrink-0 font-sans">
					<div class="relative h-fit w-fit shrink-0 self-center">
						<img
							src={weapon.icon}
							alt={weapon.name}
							class={clsx(imageSize, ' md:size-15 size-12 content-center object-cover')}
						/>
						<span class="absolute -bottom-4 -right-2 text-lg opacity-70">{weapon.level}</span>
					</div>

					<div class=" ml-5 flex w-full flex-col gap-2 p-3 py-2">
						<div
							class="grid w-full min-w-36 grid-cols-[1fr_auto] items-center gap-1 gap-x-5 text-xl text-amber-950/40"
						>
							<div class="col-span-2 self-start text-start text-2xl text-black">
								{weapon.name}
							</div>
							<div class="flex items-center gap-1">
								<img
									src="https://stardewvalleywiki.com/mediawiki/images/thumb/0/00/Attack.png/24px-Attack.png"
									alt="attack"
									class="size-4 object-cover"
								/>
								Dmg.:
							</div>

							<div class="text-end">
								{weapon.damage[0]}-{weapon.damage[1]}
							</div>
						</div>
					</div>
				</div>
			{/if}
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content sideOffset={1} class="relative w-fit min-w-80  p-0  ">
		<div>
			<Tabs.Root bind:value={activeTab}>
				<Tabs.List
					class="after:contents-[''] before:contents-[''] relative flex h-fit gap-1 rounded-none border-b-4 border-[#b14e05] bg-surface-gradient p-[3px] transition-colors before:absolute before:-bottom-[9px] before:left-0 before:right-0 before:z-10 before:h-[3px]   before:bg-[#b14e05] after:absolute after:-bottom-[6px] after:left-[-3px] after:right-[-3px] after:z-10 after:h-[3px] after:bg-[#dc7b05]  dark:bg-surface-gradient-night"
				>
					{#each tabs as tab}
						<Tabs.Trigger class="  text-xl shadow-theme-item" value={tab.value}>
							<img src={tab.icon} alt={tab.name} class=" size-8 p-1 md:size-8" />
							{tab.name}
						</Tabs.Trigger>
					{/each}
				</Tabs.List>

				<DropdownMenu.Group class="flex max-h-[40vh] w-full gap-4  overflow-y-auto  p-0 ">
					{#each tabs as tab}
						<Tabs.Content class="w-full divide-y-2 divide-solid divide-white/20 " value={tab.value}>
							{#each tab.list as _weapon}
								<DropdownMenu.Item
									on:click={() => weaponNameStore.setSelected(_weapon.name)}
									on:focusin={() => weaponNameStore.setDirty(_weapon.name)}
									class="mr-0 flex w-full cursor-pointer  gap-4 p-2 pl-2"
								>
									<div class=" relative shrink-0 p-0">
										<img
											src={_weapon.icon}
											alt={_weapon.name}
											class=" size-7 object-cover md:size-9"
										/>
										<span
											class="absolute -bottom-1 -right-2 block p-1 text-sm leading-3 text-surface-900/30"
											>{_weapon.level}</span
										>
									</div>
									<div class=" flex w-full items-center justify-between text-xl text-black">
										{_weapon.name}
										<span class=" ml-2 opacity-30">{_weapon.damage[0]}-{_weapon.damage[1]}</span>
									</div>
								</DropdownMenu.Item>
							{/each}
						</Tabs.Content>
					{/each}
				</DropdownMenu.Group>
			</Tabs.Root>
		</div>
	</DropdownMenu.Content>
</DropdownMenu.Root>
