<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { ringNames, rings } from '$model/ring.data';

	export let value: keyof typeof rings | undefined;
	export let disabledRings: (keyof typeof rings)[] = []
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			class="h-16 px-4  text-3xl rounded-none bg-amber-50 border-orange-900/20  grid place-content-center"
			variant="outline"
		>
			{#if value}
				<div class="flex gap-1 items-center">
					<img src={rings[value].icon} alt={rings[value].name} class="size-10" />
				</div>
			{:else}
				<img
					src={rings.topaz.icon}
					alt={rings.topaz.name}
					class="size-10 opacity-20 grayscale object-cover"
				/>
			{/if}
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content
		class="w-fit text-3xl  rounded-none bg-white/50 backdrop-blur-md pixel-border min-w-0"
	>
		<DropdownMenu.RadioGroup bind:value>
			<DropdownMenu.RadioItem indicator={false} value="" class="mr-0 text-center mx-auto cursor-pointer p-2 pl-2">
				<div class="size-10 mx-auto grid  place-content-center text-center w-fit text-lg">🚫</div>
			</DropdownMenu.RadioItem>
			{#each ringNames as ringKey}
				{@const ring = rings[ringKey]}
				{@const disabled = disabledRings?.includes(ringKey)}
				<DropdownMenu.RadioItem
					indicator={false}
					value={ringKey}
					disabled={disabled}
					class="mr-0 cursor-pointer flex gap-1 rounded-none text-2xl  p-2 pl-2"
				>
					<img src={ring.icon} alt={ring.name} class="size-7" />
					<div class="text-amber-900">

						{ring.name}
					</div>
				</DropdownMenu.RadioItem>
			{/each}
		</DropdownMenu.RadioGroup>
	</DropdownMenu.Content>
</DropdownMenu.Root>
