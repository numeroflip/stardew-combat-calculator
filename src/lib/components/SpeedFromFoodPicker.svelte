<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { speedFromFoodStore } from '$lib/store/calculatorOptions';

	type SpeedAmount = number;

	$: selectedSpeed = $speedFromFoodStore.selected;
	$: focusedSpeed = $speedFromFoodStore.dirty;

	$: shownSpeed = focusedSpeed ?? selectedSpeed;

	const options: SpeedAmount[] = [0, 0.5, 1, 1.5, 2].toReversed();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="lightBase"
			builders={[builder]}
			class="pixel-corners--sm grid size-12 cursor-pointer  place-content-center p-4 text-3xl md:size-16"
		>
			{shownSpeed}
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content sideOffset={10} class=" w-fit min-w-0 p-2 py-4 font-stardewTitle">
		<DropdownMenu.Group class="flex flex-col gap-2">
			{#each options as option}
				<DropdownMenu.Item
					on:click={() => {
						speedFromFoodStore.setSelected(option);
					}}
					on:focusin={() => speedFromFoodStore.setDirty(option)}
					on:focusout={() => speedFromFoodStore.clearDirty()}
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
