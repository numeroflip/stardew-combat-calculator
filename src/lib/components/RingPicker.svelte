<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { ringNames, type RingName } from '$model/ring';
	import { getRingDescription, ringsData } from '$model/ring.data';
	import { cn } from '$lib/utils.js';
	import { ringStore } from '$lib/store/calculatorOptions';

	export let type: 'left' | 'right';
	export let index: 0 | 1;

	const pairIndex = index === 0 ? 1 : 0;

	function removeRing(mode: 'dirty' | 'selected' = 'selected') {
		const setFn = mode === 'dirty' ? ringStore.setDirty : ringStore.setSelected;
		setFn({ ...$ringStore[mode], [type]: $ringStore[mode][type].toSpliced(index, 1, undefined) });
	}

	function selectRing(ring: RingName, mode: 'dirty' | 'selected' = 'selected') {
		const setFn = mode === 'dirty' ? ringStore.setDirty : ringStore.setSelected;
		setFn({ ...$ringStore[mode], [type]: $ringStore[mode][type].toSpliced(index, 1, ring) });
	}

	$: value = $ringStore.dirty[type][index] || $ringStore.selected[type][index];

	$: selectedRingPair = $ringStore.selected[type][pairIndex];

	$: disabledRings = selectedRingPair ? [selectedRingPair] : [];

	let className = '';
	export { className as class };
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="lightBase"
			size="unset"
			class={cn(
				'grid size-14  h-12  place-content-center  text-3xl   md:min-h-12 md:min-w-16',
				className
			)}
		>
			{#if value}
				<img
					src={ringsData[value].icon}
					alt={ringsData[value].name}
					class="m-2 size-10 object-cover"
				/>
			{:else}
				<img
					src={ringsData.topaz.icon}
					alt={ringsData.topaz.name}
					class="size-10 object-cover opacity-20 grayscale"
				/>
			{/if}
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content
		fitViewport
		class="w-fit  min-w-0 rounded-none bg-white/50 text-3xl backdrop-blur-md"
	>
		<div class=" max-h-[inherit] cursor-pointer overflow-y-auto overflow-x-hidden">
			<DropdownMenu.RadioGroup {value}>
				<DropdownMenu.RadioItem
					indicator={false}
					value=""
					on:click={() => removeRing()}
					on:focusin={() => removeRing('dirty')}
					on:focusout={() => removeRing('dirty')}
					class="mr-0   flex gap-1 rounded-none p-2  pl-2 text-xl"
				>
					<img
						src={ringsData.topaz.icon}
						alt={ringsData.topaz.name}
						class="size-10 object-cover opacity-20 grayscale"
					/>

					<div class="text-amber-900">No ring</div>
				</DropdownMenu.RadioItem>
				{#each ringNames as ringKey}
					{@const ring = ringsData[ringKey]}
					{@const disabled = disabledRings?.includes(ringKey)}
					<DropdownMenu.RadioItem
						indicator={false}
						value={ringKey}
						on:click={() => selectRing(ringKey)}
						on:focusin={() => selectRing(ringKey, 'dirty')}
						on:focusout={() => removeRing('dirty')}
						{disabled}
						class="mr-0 flex cursor-pointer gap-1 rounded-none p-2  pl-2 text-xl"
					>
						<img src={ring.icon} alt={ring.name} class="size-10" />
						<div class=" text-2xl text-amber-900">
							{ring.name}
							<div class="text-lg leading-3 text-amber-900/30">
								{getRingDescription(ringKey)}
							</div>
						</div>
					</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
		</div>
	</DropdownMenu.Content>
</DropdownMenu.Root>
