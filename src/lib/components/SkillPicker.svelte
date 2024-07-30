<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { keysOf } from '$lib/objectUtils';
	import {
		skills,
		type Lvl10Skills,
		lvl10Skills,
		type LVL5Skill,
		type SelectedProfession
	} from '$model/profession';

	let selectedSkills: SelectedProfession;

	let lvl5SkillKey: LVL5Skill | undefined;
	let lvl10SkillKey: Lvl10Skills | undefined;

	$: lvl5Skill = selectedSkills.lvl5 ? skills[selectedSkills.lvl5] : undefined;
	$: lvl10Skill = selectedSkills.lvl10 ? lvl10Skills[selectedSkills.lvl10] : undefined;

	let focusedLvl5SkillKey: LVL5Skill | undefined;
	let focusedLvl10SkillKey: Lvl10Skills | undefined;

	$: {
		const lvl5 = focusedLvl5SkillKey || lvl5SkillKey;
		const lvl10 = focusedLvl5SkillKey
			? focusedLvl10SkillKey
			: focusedLvl10SkillKey || lvl10SkillKey;
		const isLvl10Valid = lvl5 && lvl10 && lvl10Skills[lvl10].parent === lvl5;

		selectedSkills = {
			lvl5: lvl5,
			lvl10: isLvl10Valid ? lvl10 : undefined
		};
	}

	let step: 'lvl5' | 'lvl10' = 'lvl5';

	export { selectedSkills as skills };

	let open = false;
</script>

<div class="pixel-corners flex">
	<DropdownMenu.Root bind:open closeOnItemClick={step === 'lvl10'}>
		<DropdownMenu.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				on:click={() => (step = 'lvl5')}
				class="h-16 px-4 min-w-36 relative text-3xl rounded-none bg-amber-50 border-orange-900/20  grid place-content-center"
				variant="outline"
			>
				{#if lvl5Skill}
					<div class="flex gap-2 text-2xl items-center">
						<img src={lvl5Skill.icon} alt={lvl5Skill.name} class="size-5 object-cover" />
						<div>{lvl5Skill.name}</div>
					</div>
				{:else}
					<div class="opacity-50">Lvl 5</div>
				{/if}
			</Button>
			<Button
				on:click={() => (open = true)}
				class="h-16 px-4 min-w-40 relative text-3xl rounded-none bg-amber-50 border-orange-900/20  grid place-content-center"
				variant="outline"
				disabled={step === 'lvl5'}
			>
				{#if lvl10Skill}
					<div class="flex gap-2 items-center">
						<img src={lvl10Skill.icon} alt={lvl10Skill.name} class="size-5 object-cover" />
						<div class="text-2xl">{lvl10Skill.name}</div>
					</div>
				{:else}
					<div class="opacity-50">Lvl 10</div>
				{/if}
			</Button>
		</DropdownMenu.Trigger>

		<DropdownMenu.Content
			class="w-fit text-3xl transition-all  rounded-none bg-white/50 backdrop-blur-md pixel-border min-w-0"
		>
			{#if step === 'lvl5'}
				<div class="max-h-[60vh] overflow-y-auto overflow-x-hidden">
					{#each keysOf(skills) as skillKey}
						{@const skill = skills[skillKey]}
						<DropdownMenu.Item
							on:focusin={() => (focusedLvl5SkillKey = skillKey)}
							on:focusout={() => (focusedLvl5SkillKey = undefined)}
							on:click={() => {
								lvl5SkillKey = skillKey;
								step = 'lvl10';
							}}
							class="flex gap-2 cursor-pointer relative flex-col justify-center"
						>
							<div class="flex text-2xl items-center gap-2">
								<img src={skill.icon} alt={skill.name} class=" size-10" />
								{skill.name}
							</div>

							<div class="text-base text-center leading-5 opacity-45">
								{skill.description}
							</div>
						</DropdownMenu.Item>
					{/each}
				</div>
			{:else if step === 'lvl10' && lvl5Skill}
				<div class="grid grid-cols-2 max-w-xl relative">
					<DropdownMenu.Item
						disabled
						class="flex gap-2 cursor-pointer relative flex-col justify-center"
					>
						<div class="flex text-2xl items-center gap-2">
							<img src={lvl5Skill.icon} alt={lvl5Skill.name} class=" size-10" />
							{lvl5Skill.name}
						</div>

						<div class=" text-base text-center leading-5 opacity-45">
							{lvl5Skill.description}
						</div>
					</DropdownMenu.Item>
					<div class="absolute top-0 left-0">
						<Button
							on:click={() => (step = 'lvl5')}
							aria-label="Back"
							variant="ghost"
							class="bg-transparent text-amber-900  pixel-border w-fit left-0"
							><div class="rotate-180 text-3xl font-black">{'>'}</div></Button
						>
					</div>

					<div>
						{#each keysOf(lvl5Skill.lvl10Skills) as _lvl10SkillKey}
							{@const skill = lvl5Skill.lvl10Skills.hasOwnProperty(_lvl10SkillKey)
								? /* @ts-expect-error */
									lvl5Skill.lvl10Skills[_lvl10SkillKey]
								: undefined}

							<DropdownMenu.Item
								class="flex flex-col pixel-corners px-4 text-xl cursor-pointer"
								on:focusin={() => (focusedLvl10SkillKey = _lvl10SkillKey)}
								on:focusout={() => (focusedLvl10SkillKey = undefined)}
								on:click={() => {
									lvl10SkillKey = _lvl10SkillKey;
								}}
							>
								<div class="flex text-center">
									<img src={skill.icon} alt={skill.name} class=" size-6 mr-2" />
									<span class="text-2xl"> {skill.name}</span>
								</div>
								<div class=" text-base text-center leading-5">
									<span class="opacity-45">
										{skill.description}
									</span>
								</div>
							</DropdownMenu.Item>
						{/each}
					</div>
				</div>
			{/if}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
