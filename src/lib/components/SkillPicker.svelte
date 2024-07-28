<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { skills, type Lvl10Skills, type LVL5Skill } from '$model/profession';

	export let lvl5SkillKey: LVL5Skill | undefined;
	export let lvl10SkillKey: Lvl10Skills | undefined;

	$: lvl5Skill = lvl5SkillKey ? skills[lvl5SkillKey] : undefined;

	const notypecheck = (x: any) => x;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			class="h-16  pixel-corners w-fit p-4 py-7  text-2xl rounded-none bg-amber-50 border-none   grid place-content-center"
			variant="outline"
		>
			{#if lvl5SkillKey}
				{skills[lvl5SkillKey].name}
			{/if}
			{#if lvl5Skill && lvl10SkillKey && lvl10SkillKey in lvl5Skill.lvl10Skills}
				<!-- @ts-ignore -->
				{'>'}
				{notypecheck(lvl5Skill).lvl10Skills[lvl10SkillKey].name}
			{/if}

			{#if !lvl5SkillKey && !lvl10SkillKey}
				<div class="opacity-50">Pick a Skill</div>
			{/if}
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content
		class="w-fit text-3xl   rounded-none bg-white/50 backdrop-blur-md pixel-border min-w-0"
	>
		{#each Object.entries(skills) as [skillKey, skill], index}
			{#if index === 1}
				<DropdownMenu.Separator class="bg-amber-950/20" />
			{/if}
			<DropdownMenu.Group class="text-center grid grid-cols-2 ">
				<DropdownMenu.Item disabled class="flex gap-2 relative flex-col justify-center">
					<div class="flex text-2xl items-center gap-2">
						<img src={skill.icon} alt={skill.name} class=" size-10" />
						{skill.name}
					</div>

					<div class="text-lg opacity-45">
						{skill.description}
					</div>
					<div class="absolute top-0 bottom-0 right-2 flex items-center text-5xl">{'>'}</div>
				</DropdownMenu.Item>
				<div class="flex flex-col">
					{#each Object.entries(skill.lvl10Skills) as [_lvl10SkillKey, _lvl10Skill]}
						<DropdownMenu.Item
							class="flex flex-col pixel-corners px-4 text-xl cursor-pointer"
							on:click={() => {
								lvl5SkillKey = notypecheck(skillKey);
								lvl10SkillKey = notypecheck(_lvl10SkillKey);
							}}
						>
							<div class="flex">
								<img src={_lvl10Skill.icon} alt={_lvl10Skill.name} class=" size-6 mr-2" />
								<span class="text-2xl"> {_lvl10Skill.name}</span>
							</div>
							<div class="text-xl">
								<span class="opacity-45">
									{_lvl10Skill.description}
								</span>
							</div>
						</DropdownMenu.Item>
					{/each}
				</div>
			</DropdownMenu.Group>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
