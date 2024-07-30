<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { innateEnchantment } from '$model/enchantment';
	import { keysOf } from '$lib/objectUtils';

	let strValue: string;
	type EnchantmentKey = keyof typeof innateEnchantment.guaranteed;

	export let enchantment: { key: EnchantmentKey; optionName: number } | undefined;
	export let focusedEnchantment: { key: EnchantmentKey; optionName: number } | undefined =
		undefined;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			class=" pixel-corners p-4 py-7 rounded-sm bg-amber-50  text-2xl  grid place-content-center"
			variant="outline"
		>
			{#if enchantment}
				<div>
					{innateEnchantment.guaranteed[enchantment.key].name}
					<span class="font-mono">+</span>{enchantment.optionName}
				</div>
			{:else}
				<div class="opacity-50">No Enchantment</div>
			{/if}
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content
		sideOffset={10}
		class="w-fit bg-white/50 backdrop-blur-md pixel-border   min-w-0"
	>
		<DropdownMenu.Group>
			<DropdownMenu.Item
				on:focusin={() => (focusedEnchantment = undefined)}
				on:focusout={() => (focusedEnchantment = undefined)}
				on:click={() => (enchantment = undefined)}
				class="mr-0 cursor-pointer p-2 pl-2"
			>
				<div class="size-10 grid text-center w-full place-content-center text-xl">🚫</div>
			</DropdownMenu.Item>
			{#each keysOf(innateEnchantment.guaranteed) as enchantmentKey}
				{@const _enchantment = innateEnchantment.guaranteed[enchantmentKey]}
				<DropdownMenu.Separator />
				<DropdownMenu.Label class="text-xl text-amber-900">{_enchantment.name}</DropdownMenu.Label>
				<div class="flex gap-2">
					{#each _enchantment.options as option}
						<DropdownMenu.Item
							on:focusin={() =>
								(focusedEnchantment = {
									key: enchantmentKey,
									optionName: option.name
								})}
							on:focusout={() => (focusedEnchantment = undefined)}
							on:click={() =>
								(enchantment = {
									key: enchantmentKey,
									optionName: option.name
								})}
							class="mr-0 min-w-10 text-xl cursor-pointer p-2 pl-2"
						>
							<span class="font-mono">+</span>{option.name}
						</DropdownMenu.Item>
					{/each}
				</div>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
