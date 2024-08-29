<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { luckStore } from '$lib/store/calculatorOptions';

	type LuckAmount = number;

	$: selectedLuck = $luckStore.selected;
	$: focusedLuck = $luckStore.dirty;
	$: shownLuck = focusedLuck ?? selectedLuck;

	const options: LuckAmount[] = [0, 1, 2, 3, 4, 5, 6];
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="lightBase"
			builders={[builder]}
			class="pixel-corners--sm grid size-12 cursor-pointer  place-content-center p-4 text-3xl md:size-16"
		>
			{shownLuck}
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content sideOffset={10} class=" w-fit min-w-0 p-2 py-4 font-stardewTitle">
		<DropdownMenu.Group class="flex flex-col gap-2">
			{#each options as option}
				<DropdownMenu.Item
					on:click={() => luckStore.setSelected(option)}
					on:focusin={() => luckStore.setDirty(option)}
					on:focusout={() => luckStore.clearDirty()}
					class="mr-0 grid size-8 cursor-pointer place-content-center p-5 md:size-12 "
				>
					<div class="flex flex-col">
						<div class="text-2xl capitalize text-amber-900 md:text-3xl">
							{option}
						</div>
					</div>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
