<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { innateEnchantments } from '$model/enchantment';
	import { keysOf } from '$lib/objectUtils';
	import { enchantmentStore, weaponStore } from '$lib/store/calculatorOptions';

	$: weapon = $weaponStore.dirty || $weaponStore.selected;
	$: canBeEnchanted =
		weapon &&
		weapon.level < 15 &&
		!weapon.name.includes('Galaxy') &&
		!weapon.name.includes('Infinity');
	$: enchantment = $enchantmentStore.dirty || $enchantmentStore.selected;
</script>

<section
	class={`flex w-full flex-wrap justify-between gap-5 py-1 pl-2 ${canBeEnchanted ? '' : 'opacity-50 grayscale '}`}
>
	<div class="flex items-center font-sans text-2xl text-black">
		Enchantment
		<!-- 		<img
			src="https://stardewvalleywiki.com/mediawiki/images/thumb/9/9f/Gold_Quality.png/16px-Gold_Quality.png"
			alt=""
			class="mx-2 size-5 object-cover"
		/>: -->
	</div>
	<DropdownMenu.Root>
		<div class=" flex w-fit items-center font-stardew text-black">
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					disabled={!canBeEnchanted}
					builders={[builder]}
					variant="default"
					class="grid min-w-[166px] place-content-center  rounded-none border-none  px-5 py-6  text-xl text-black md:py-7 md:text-xl"
				>
					{#if !canBeEnchanted}
						<div>Not Available</div>
					{:else if enchantment}
						<div>
							{innateEnchantments.guaranteed[enchantment.key].name}
							<span class="font-mono">+</span>{enchantment.optionName}
						</div>
					{:else}
						<div class="opacity-50">Pick something</div>
					{/if}
				</Button>
			</DropdownMenu.Trigger>
		</div>

		<DropdownMenu.Content fitViewport sideOffset={5} class="w-fit min-w-0" align="end">
			<DropdownMenu.Group class=" max-h-[40vh] overflow-y-auto overflow-x-hidden p-0">
				<DropdownMenu.Item
					on:focusin={enchantmentStore.clearDirty}
					on:focusout={enchantmentStore.clearDirty}
					on:click={() => enchantmentStore.setSelected(undefined)}
					class="mr-0 cursor-pointer p-0  "
				>
					<div class="size-12 w-full place-content-center text-center text-xl shadow-theme-item">
						🚫
					</div>
				</DropdownMenu.Item>
				{#each keysOf(innateEnchantments.guaranteed) as enchantmentKey}
					{@const _enchantment = innateEnchantments.guaranteed[enchantmentKey]}
					<DropdownMenu.Separator class="bg-surface-200" />
					<DropdownMenu.Label class="text-xl  font-normal text-black"
						>{_enchantment.name}</DropdownMenu.Label
					>
					<div class="flex">
						{#each _enchantment.options as option}
							<DropdownMenu.Item
								on:focusin={() =>
									enchantmentStore.setDirty({
										key: enchantmentKey,
										optionName: option.name
									})}
								on:focusout={enchantmentStore.clearDirty}
								on:click={() =>
									enchantmentStore.setSelected({
										key: enchantmentKey,
										optionName: option.name
									})}
								class=" mr-0 size-12 cursor-pointer p-2 text-center text-xl  shadow-theme-item"
							>
								<div class="font-funky w-full">
									<span>+</span>{option.name}
								</div>
							</DropdownMenu.Item>
						{/each}
					</div>
				{/each}
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</section>
