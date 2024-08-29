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
	class={`pixel-corners z-[2] flex w-full justify-between gap-5 py-1 pl-2 ${canBeEnchanted ? '' : 'opacity-50 grayscale '}`}
>
	<div class="flex items-center text-2xl">
		Enchantment
		<img
			src="https://stardewvalleywiki.com/mediawiki/images/thumb/9/9f/Gold_Quality.png/16px-Gold_Quality.png"
			alt=""
			class="mx-2 size-5 object-cover"
		/>:
	</div>
	<DropdownMenu.Root>
		<div class=" flex w-fit items-center">
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					disabled={!canBeEnchanted}
					builders={[builder]}
					variant="pixelatedDynamic"
					class="grid  place-content-center rounded-none  border-none px-5  py-6 text-xl md:py-7 md:text-2xl"
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

		<DropdownMenu.Content fitViewport sideOffset={10} class="w-fit min-w-0 px-4 py-3">
			<DropdownMenu.Group>
				<DropdownMenu.Item
					on:focusin={enchantmentStore.clearDirty}
					on:focusout={enchantmentStore.clearDirty}
					on:click={() => enchantmentStore.setSelected(undefined)}
					class="mr-0  cursor-pointer "
				>
					<div class="size-15 w-full place-content-center text-center text-xl">🚫</div>
				</DropdownMenu.Item>
				{#each keysOf(innateEnchantments.guaranteed) as enchantmentKey}
					{@const _enchantment = innateEnchantments.guaranteed[enchantmentKey]}
					<DropdownMenu.Separator class="bg-surface-200" />
					<DropdownMenu.Label class="text-xl text-amber-900">{_enchantment.name}</DropdownMenu.Label
					>
					<div class="flex gap-2">
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
								class=" mr-0  size-14 cursor-pointer p-2 text-center  text-xl"
							>
								<div class="w-full font-stardewTitle">
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
