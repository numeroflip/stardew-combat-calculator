<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { rings } from '$model/ring.data';

	export let value: keyof typeof rings | undefined;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			class="h-16 px-4 pixel-border text-3xl rounded-sm bg-amber-50  grid place-content-center"
			variant="outline"
		>
			{#if value}
				{rings[value].name}
			{:else}
				Open
			{/if}
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="w-fit text-3xl bg-white/50 backdrop-blur-md pixel-border min-w-0">
		<DropdownMenu.RadioGroup bind:value>
			<DropdownMenu.RadioItem indicator={false} value="" class="mr-0 cursor-pointer p-2 pl-2">
				<div class="size-10 grid place-content-center text-xl">🚫</div>
			</DropdownMenu.RadioItem>
			{#each Object.entries(rings) as [ringKey, ring]}
				<DropdownMenu.RadioItem
					indicator={false}
					value={ringKey}
					class="mr-0 cursor-pointer text-3xl h-16 p-2 pl-2"
				>
					{ring.name}
					<!-- <img src={gemIcon[gemName]} alt={ring.name} class=" size-10" /> -->
				</DropdownMenu.RadioItem>
			{/each}
		</DropdownMenu.RadioGroup>
	</DropdownMenu.Content>
</DropdownMenu.Root>
