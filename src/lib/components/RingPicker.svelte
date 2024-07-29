<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { getRingDescription, ringNames, rings, type RingName } from '$model/ring.data';

	export let value: RingName | undefined;
	export let disabledRings: (keyof typeof rings)[] = [];
	export let focusedRing: RingName | undefined = undefined;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			class="h-16 px-4  text-3xl rounded-none bg-amber-50 border-orange-900/20  grid place-content-center"
			variant="outline"
		>
			{#if value}
				<img src={rings[value].icon} alt={rings[value].name} class="size-10 object-cover" />
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
		class="w-fit text-3xl   rounded-none bg-white/50 backdrop-blur-md pixel-border min-w-0"
	>
		<div class="max-h-[60vh] overflow-y-auto overflow-x-hidden">
			<DropdownMenu.RadioGroup bind:value>
				<DropdownMenu.RadioItem
					indicator={false}
					value=""
					class="mr-0 cursor-pointer  flex gap-1 rounded-none text-xl  p-2 pl-2"
				>
					<img
						src={rings.topaz.icon}
						alt={rings.topaz.name}
						class="size-10 opacity-20 grayscale object-cover"
					/>

					<div class="text-amber-900">No ring</div>
				</DropdownMenu.RadioItem>
				{#each ringNames as ringKey}
					{@const ring = rings[ringKey]}
					{@const disabled = disabledRings?.includes(ringKey)}
					<DropdownMenu.RadioItem
						indicator={false}
						value={ringKey}
						on:focusin={() => (focusedRing = ringKey)}
						on:focusout={() => (focusedRing = undefined)}
						{disabled}
						class="mr-0 cursor-pointer flex gap-1 rounded-none text-xl  p-2 pl-2"
					>
						<img src={ring.icon} alt={ring.name} class="size-10" />
						<div class=" text-2xl text-amber-900">
							{ring.name}
							<div class="text-amber-900/30 leading-3 text-lg">
								{getRingDescription(ringKey)}
							</div>
						</div>
					</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
		</div>
	</DropdownMenu.Content>
</DropdownMenu.Root>
