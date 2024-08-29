<script lang="ts">
	import { gemNames, type GemName } from '$model/gem';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { gemIcon, getGemDescription } from '$model/gem.data';
	import { gemsStore } from '$lib/store/calculatorOptions';

	export let index: 0 | 1 | 2;

	function removeGem(mode: 'dirty' | 'selected') {
		const setFn = mode === 'dirty' ? gemsStore.setDirty : gemsStore.setSelected;
		const items = $gemsStore[mode].toSpliced(index, 1, undefined);

		setFn(items);
	}

	function selectGem(gem: GemName, mode: 'dirty' | 'selected') {
		const setFn = mode === 'dirty' ? gemsStore.setDirty : gemsStore.setSelected;

		const items = $gemsStore[mode].toSpliced(index, 1, gem);
		setFn(items);
	}

	$: shownGem = $gemsStore.dirty[index] || $gemsStore.selected[index];

	$: shownGems = [
		$gemsStore.dirty[0] || $gemsStore.selected[0],
		$gemsStore.dirty[1] || $gemsStore.selected[1],
		$gemsStore.dirty[2] || $gemsStore.selected[2]
	];
	$: gemLevel = shownGems.filter((gem) => gem === shownGem).length as 1 | 2 | 3;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="pixelatedDynamic"
			class="no grid size-12 place-content-center rounded-none border-none  p-0  pl-0 pr-0 md:size-14"
		>
			{#if shownGem}
				<img src={gemIcon[shownGem]} alt={shownGem} class="size-8 object-cover md:size-10" />
			{:else}
				<img
					src={gemIcon.diamond}
					alt=""
					class="size-8 object-cover opacity-20 grayscale md:size-10"
				/>
			{/if}
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content sideOffset={10} class=" w-fit min-w-0 ">
		<DropdownMenu.Group class="max-h-[40vh] overflow-y-auto ">
			<DropdownMenu.Item
				on:click={() => removeGem('selected')}
				on:focusin={() => removeGem('dirty')}
				on:focusout={() => removeGem('dirty')}
				class="mr-0 flex cursor-pointer gap-2 p-2 pl-2 text-lg lg:text-xl"
			>
				<div class="grid place-content-center">
					<img
						src={gemIcon.diamond}
						alt=""
						class="size-8 object-cover opacity-20 grayscale lg:size-10"
					/>
				</div>
				<div class="text-amber-900">No Gem</div>
			</DropdownMenu.Item>

			{#each gemNames as gemName}
				<DropdownMenu.Item
					on:click={() => selectGem(gemName, 'selected')}
					on:focusin={() => selectGem(gemName, 'dirty')}
					on:focusout={() => removeGem('dirty')}
					class=" mr-0 flex cursor-pointer gap-2 p-2 pl-2 text-lg lg:text-xl"
				>
					<img src={gemIcon[gemName]} alt={gemName} class="size-8 lg:size-10" />
					<div class="flex flex-col">
						<div class="capitalize text-surface-900">
							{gemName}
						</div>

						<div class="text-sm leading-3 text-surface-900/50">
							{getGemDescription(gemName, gemLevel)}
						</div>
					</div>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
