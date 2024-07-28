<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { weapons, swords, clubs, daggers } from '$model/weapon.data';

	export let weaponName: string;
	$: weapon = weapons.find((weapon) => weapon.name === weaponName);

	const orderedSwords = swords.toSorted((a, b) => b.level - a.level);
	const orderedDaggers = daggers.toSorted((a, b) => b.level - a.level);
	const orderedClubs = clubs.toSorted((a, b) => b.level - a.level);

	let tab: 'swords' | 'daggers' | 'clubs' = 'swords';

	import * as Tabs from '$lib/components/ui/tabs';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			class=" pixel-corners px-10 gap-3 rounded-sm bg-amber-50 h-fit w-fit  p-6 flex items-center justify-center "
			variant="outline"
		>
			{#if weapon}
				<div class="flex flex-col">
					<div class="text-4xl flex flex-col gap-5 text-center">
						{weaponName}
						<div class="text-left text-2xl flex gap-5 text-amber-950/40">
							<img src={weapon.icon} alt={weapon.name} class=" size-20 object-cover" />
							<div class="grid grid-cols-[1fr_auto] gap-x-5">
								<div>Dmg:</div>
								<div class="text-end">
									{weapon.damage[0]}-{weapon.damage[1]}
								</div>
								<div>Level:</div>
								<div class="text-end">
									{weapon.level}
								</div>
								<div>Base crit chance:</div>
								<div class="text-end">
									{weapon.critStrikeChance * 100}%
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
		<Tabs.Root bind:value={tab}>
			<Tabs.List class=" flex bg-transparent rounded-none h-fit border-b-2 border-amber-950">
				<Tabs.Trigger class="text-xl bg-transparent" value="daggers">
					Dagger
					<img src={orderedDaggers[11].icon} alt={'Swords'} class=" size-10" /></Tabs.Trigger
				>
				<Tabs.Trigger class="text-xl " value="swords">
					Sword
					<img src={orderedSwords[4].icon} alt={'Swords'} class=" size-10" />
				</Tabs.Trigger>
				<Tabs.Trigger class="text-xl " value="clubs">
					Club
					<img src={orderedClubs[11].icon} alt={'Swords'} class=" size-10" /></Tabs.Trigger
				>
			</Tabs.List>

			<DropdownMenu.RadioGroup
				bind:value={weaponName}
				class="flex max-h-[40vh] overflow-y-auto gap-4"
			>
				<Tabs.Content value="daggers">
					{#each orderedDaggers as dagger}
						<DropdownMenu.RadioItem
							indicator={false}
							value={dagger.name}
							class="mr-0 flex gap-2 cursor-pointer p-2 pl-2"
						>
							<img src={dagger.icon} alt={dagger.name} class=" size-10" />
							<div class="text-2xl">
								{dagger.name}
							</div>
						</DropdownMenu.RadioItem>
					{/each}
				</Tabs.Content>
				<Tabs.Content value="swords"
					>{#each orderedSwords as sword}
						<DropdownMenu.RadioItem
							indicator={false}
							value={sword.name}
							class="mr-0 flex gap-2 cursor-pointer p-2 pl-2"
						>
							<img src={sword.icon} alt={sword.name} class=" size-10" />
							<div class="text-2xl">
								{sword.name}
							</div>
						</DropdownMenu.RadioItem>
					{/each}</Tabs.Content
				>
				<Tabs.Content value="clubs">
					{#each orderedClubs as club}
						<DropdownMenu.RadioItem
							indicator={false}
							value={club.name}
							class="mr-0 flex gap-2 cursor-pointer p-2 pl-2"
						>
							<img src={club.icon} alt={club.name} class=" size-10" />
							<div class="text-2xl">
								{club.name}
							</div>
						</DropdownMenu.RadioItem>
					{/each}
				</Tabs.Content>
			</DropdownMenu.RadioGroup>
		</Tabs.Root>
	</DropdownMenu.Content>
</DropdownMenu.Root>
