<script lang="ts">
	import { gemNames, type GemName } from '$model/gem';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { gemIcon, getGemDescription, gem as allGems } from '$model/gem.data';

	export let gem: GemName | undefined;
	export let focusedGem: GemName | undefined = undefined;
	export let gemLevel: 1 | 2 | 3 = 1;

	$: shownGem = focusedGem ?? gem;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			class="size-16 pixel-corners rounded-sm bg-amber-50  p-0 grid place-content-center"
			variant="outline"
		>
			{#if shownGem}
				<img src={gemIcon[shownGem]} alt={shownGem} class="size-10 object-cover" />
			{:else}
				<img src={gemIcon.diamond} alt="" class="size-10 opacity-20 grayscale object-cover" />
			{/if}
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content
		sideOffset={10}
		class="w-fit bg-white/50 backdrop-blur-md pixel-border   min-w-0"
	>
		<DropdownMenu.Group>
			<DropdownMenu.Item
				on:click={() => (gem = undefined)}
				on:focusin={() => (focusedGem = undefined)}
				on:focusout={() => (focusedGem = undefined)}
				class="mr-0 flex gap-2 cursor-pointer p-2 pl-2"
			>
				<div class="size-10 grid place-content-center text-xl">
					<img src={gemIcon.diamond} alt="" class="size-10 opacity-20 grayscale object-cover" />
				</div>
				<div class="text-amber-900 text-xl">No Gem</div>
			</DropdownMenu.Item>
			{#each gemNames as gemName}
				<DropdownMenu.Item
					on:click={() => (gem = gemName)}
					on:focusin={() => (focusedGem = gemName)}
					on:focusout={() => (focusedGem = undefined)}
					class="mr-0 flex gap-2 cursor-pointer p-2 pl-2"
				>
					<img src={gemIcon[gemName]} alt={gemName} class=" size-10" />
					<div class="flex flex-col">
						<div class="capitalize text-amber-900 text-xl">
							{gemName}
						</div>

						<div class="text-amber-900/30 leading-3 text-lg">
							{getGemDescription(gemName, gemLevel)}
						</div>
					</div>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
