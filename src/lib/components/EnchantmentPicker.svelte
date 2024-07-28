<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { innateEnchantment } from '$model/enchantment';

	
    let strValue: string
    type EnchantmentKey = keyof typeof innateEnchantment.guaranteed

    export let enchantmentKey: string | undefined
    export let enchantmentOptionName: number | undefined


    $: [enchantmentKey, enchantmentOptionName] = strValue ? [strValue.split('__')[0], Number(strValue.split('__')[1]) ] : []

   

    $:enchantmentType =enchantmentKey ? innateEnchantment.guaranteed[enchantmentKey as EnchantmentKey] : undefined

</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			class=" pixel-corners p-4 py-7 rounded-sm bg-amber-50  text-2xl  grid place-content-center"
			variant="outline"
		>
        {#if enchantmentType && enchantmentOptionName}
        <div>

            {enchantmentType.name} <span class="font-mono">+</span>{enchantmentOptionName} 

        </div>
        {:else}
        Pick an Enchantment

        {/if}
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content
		sideOffset={10}
		class="w-fit bg-white/50 backdrop-blur-md pixel-border   min-w-0"
	>
		<DropdownMenu.RadioGroup bind:value={strValue}>
			<DropdownMenu.RadioItem indicator={false} value="" class="mr-0 cursor-pointer p-2 pl-2">
				<div class="size-10 grid text-center w-full place-content-center text-xl">🚫</div>
			</DropdownMenu.RadioItem>
			{#each Object.entries(innateEnchantment.guaranteed) as [enchantmentKey, enchantment]}
            <DropdownMenu.Separator />
				<DropdownMenu.Label class="text-xl text-amber-900">{enchantment.name}</DropdownMenu.Label>
                <div class="flex gap-2">

                    {#each enchantment.options as option}
                    
					<DropdownMenu.RadioItem
						indicator={false}
						value={String(`${enchantmentKey}__${option.name}`)}
						class="mr-0 min-w-10 text-xl cursor-pointer p-2 pl-2"
                        >
                        <span class="font-mono">+</span>{option.name}
					</DropdownMenu.RadioItem>
                    {/each}
                </div>
			{/each}
		</DropdownMenu.RadioGroup>
	</DropdownMenu.Content>
</DropdownMenu.Root>
