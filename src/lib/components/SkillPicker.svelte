<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { keysOf } from '$lib/objectUtils';
	import { skillsStore } from '$lib/store/calculatorOptions';
	import { skillSchema } from '$model/calculatorOptions';
	import { skills, type Lvl10Skills, lvl10Skills, type LVL5Skill } from '$model/profession';

	$: activeSkills = {
		lvl5: $skillsStore.dirty.lvl5 || $skillsStore.selected.lvl5,
		lvl10: $skillsStore.dirty.lvl10 || $skillsStore.selected.lvl10
	};

	$: lvl5Skill = activeSkills.lvl5 ? skills[activeSkills.lvl5] : undefined;
	$: lvl10Skill = activeSkills.lvl10 ? lvl10Skills[activeSkills.lvl10] : undefined;

	$: selectedLvl5 = $skillsStore.selected.lvl5;

	$: step = selectedLvl5 ? 'lvl10' : 'lvl5';

	let open = false;

	function selectLvl5(value: LVL5Skill, mode: 'selected' | 'dirty' = 'selected') {
		const setFn = mode === 'dirty' ? skillsStore.setDirty : skillsStore.setSelected;
		setFn({ lvl5: value });
	}

	function clearLvl5(mode: 'dirty' | 'selected' = 'selected') {
		const setFn = mode === 'dirty' ? skillsStore.setDirty : skillsStore.setSelected;
		setFn({ lvl5: undefined });
	}

	function selectLvl10(value: Lvl10Skills, mode: 'selected' | 'dirty' = 'selected') {
		const setFn = mode === 'dirty' ? skillsStore.setDirty : skillsStore.setSelected;

		const newSkillSet = { lvl5: $skillsStore[mode].lvl5, lvl10: value };
		const validatedSkills = skillSchema.safeParse(newSkillSet);
		if (!validatedSkills.success) {
			console.error('Invalid skill set', validatedSkills.error);
			return;
		}

		setFn(validatedSkills.data);
	}

	function clearLvl10(mode: 'dirty' | 'selected' = 'selected') {
		const setFn = mode === 'dirty' ? skillsStore.setDirty : skillsStore.setSelected;
		setFn({ lvl5: $skillsStore[mode].lvl5, lvl10: undefined });
		if (mode === 'selected') {
			step = 'lvl5';
		}
	}
</script>

<div class="flex w-full gap-2">
	<DropdownMenu.Root bind:open closeOnItemClick={step === 'lvl10'}>
		<DropdownMenu.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				on:click={() => clearLvl10()}
				variant="default"
				class="relative grid h-16 min-w-36 shrink-0 grow basis-1 place-content-center rounded-none  border-orange-900/20 px-4   pr-10 text-3xl"
			>
				{#if lvl5Skill}
					<div class="flex items-center gap-2 text-2xl">
						<img src={lvl5Skill.icon} alt={lvl5Skill.name} class="size-5 object-cover" />
						<div>{lvl5Skill.name}</div>
					</div>
					<span class="absolute bottom-0 right-1 text-sm text-surface-900/30">Lvl 5</span>
				{:else}
					<div class="opacity-50">Lvl 5</div>
				{/if}
			</Button>

			<Button
				on:click={() => (open = true)}
				variant="default"
				class="relative grid h-16 min-w-40 shrink-0 grow basis-1 place-content-center rounded-none border-orange-900/20   px-4 text-3xl"
				disabled={step === 'lvl5'}
			>
				{#if lvl10Skill}
					<div class="flex items-center gap-2">
						<img src={lvl10Skill.icon} alt={lvl10Skill.name} class="size-5 object-cover" />
						<div class="text-2xl">{lvl10Skill.name}</div>
					</div>
					<span class="absolute bottom-0 right-1 text-sm text-surface-900/30">Lvl 10</span>
				{:else}
					<div class="opacity-50">Lvl 10</div>
				{/if}
			</Button>
		</DropdownMenu.Trigger>

		<DropdownMenu.Content
			class="w-fit  min-w-0 rounded-none p-2  text-3xl shadow-theme backdrop-blur-md transition-all"
		>
			{#if step === 'lvl5'}
				<div class=" max-h-[60vh] overflow-y-auto overflow-x-hidden">
					{#each keysOf(skills) as skillKey}
						{@const skill = skills[skillKey]}
						<DropdownMenu.Item
							on:focusin={() => selectLvl5(skillKey, 'dirty')}
							on:focusout={() => clearLvl5('dirty')}
							on:click={() => {
								selectLvl5(skillKey);
							}}
							class="relative flex cursor-pointer flex-col justify-center gap-2"
						>
							<div class="flex items-center gap-2 text-2xl">
								<img src={skill.icon} alt={skill.name} class=" size-10" />
								{skill.name}
							</div>

							<div class="text-center text-base leading-5 opacity-45">
								{skill.description}
							</div>
						</DropdownMenu.Item>
					{/each}
				</div>
			{:else if step === 'lvl10' && lvl5Skill}
				<div class="relative grid max-w-xl grid-cols-2">
					<DropdownMenu.Item
						disabled
						class="relative flex cursor-pointer flex-col justify-center gap-2"
					>
						<div class="flex items-center gap-2 text-2xl">
							<img src={lvl5Skill.icon} alt={lvl5Skill.name} class=" size-10" />
							{lvl5Skill.name}
						</div>

						<div class=" text-center text-base leading-5 opacity-45">
							{lvl5Skill.description}
						</div>
					</DropdownMenu.Item>
					<div class="absolute left-0 top-0">
						<Button
							on:click={() => clearLvl10()}
							aria-label="Back"
							variant="ghost"
							class="pixel-border left-0  w-fit bg-transparent text-amber-900"
							><div class="rotate-180 text-3xl font-black">{'>'}</div></Button
						>
					</div>

					<div class="border-4 border-surface-900/50">
						{#each keysOf(lvl5Skill.lvl10Skills) as _lvl10SkillKey}
							{@const skill = lvl5Skill.lvl10Skills.hasOwnProperty(_lvl10SkillKey)
								? /* @ts-expect-error */
									lvl5Skill.lvl10Skills[_lvl10SkillKey]
								: undefined}

							<DropdownMenu.Item
								class="flex cursor-pointer flex-col px-4 text-xl"
								on:focusin={() => selectLvl10(_lvl10SkillKey, 'dirty')}
								on:focusout={() => clearLvl10('dirty')}
								on:click={() => {
									selectLvl10(_lvl10SkillKey);
								}}
							>
								<div class="flex text-center">
									<img src={skill.icon} alt={skill.name} class=" mr-2 size-6" />
									<span class="text-2xl"> {skill.name}</span>
								</div>
								<div class=" text-center text-base leading-5">
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
