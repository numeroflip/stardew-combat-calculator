<script lang="ts">
	import { gemNames, type GemName } from '$model/gem';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { gemIcon, getGemDescription, gem as allGems } from '$model/gem.data';

	type LuckAmount = 0 | 1 | 2 | 3 | 4 | 5 | 6;

	let luck: LuckAmount = 0;
	let focusedLuck: LuckAmount = 0;
	let shownLuck: LuckAmount = 0;

	const options: LuckAmount[] = [0, 1, 2, 3, 4, 5, 6];

	$: shownLuck = focusedLuck ?? luck;

	export { shownLuck as luck };
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			class="size-[72px] pixel-corners p-4 pixel-corners   cursor-pointer text-3xl rounded-sm bg-amber-50 grid place-content-center"
			variant="outline"
		>
			{shownLuck}
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content
		sideOffset={10}
		class="w-fit bg-white/50 backdrop-blur-md pixel-border   min-w-0"
	>
		<DropdownMenu.Group>
			{#each options as option}
				<DropdownMenu.Item
					on:click={() => (luck = option)}
					on:focusin={() => (focusedLuck = option)}
					on:focusout={() => (focusedLuck = luck)}
					class="mr-0 grid place-content-center cursor-pointer p-5 size-12 "
				>
					<div class="flex flex-col">
						<div class="capitalize 2 text-amber-900 text-3xl">
							{option}
						</div>
					</div>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
