<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type $$Props = HTMLButtonAttributes;

	const borderWidth = 3;
	const shadowOffset = 6;
</script>

<button
	{...$$props}
	on:click
	on:keydown
	style={`--borderWidth: ${borderWidth}px; --shadowOffset: ${shadowOffset}px`}
	class={cn(
		' relative z-10 flex items-center gap-2 bg-[#fa9305] px-3 py-0 pb-[2px] pt-[3px] font-stardew text-lg leading-7 text-black hover:brightness-110 md:px-4 md:py-1 md:pt-[6px] md:text-2xl',
		$$props.class
	)}
>
	<slot />

	<div
		class="absolute left-0 right-0 top-[var(--borderWidth)] size-[var(--borderWidth)] bg-white/30"
	/>
	<div class="absolute right-0 top-[var(--borderWidth)] size-[var(--borderWidth)] bg-white/30" />

	<div class="absolute left-0 right-0 top-0 h-[var(--borderWidth)] bg-white/30" />
	<div class="absolute bottom-0 left-0 right-0 h-[var(--borderWidth)] bg-black/20" />

	<div
		class="absolute bottom-[var(--borderWidth)] left-0 right-0 size-[var(--borderWidth)] bg-black/20"
	/>
	<div class="absolute bottom-[var(--borderWidth)] right-0 size-[var(--borderWidth)] bg-black/20" />

	<div
		class="absolute -top-[var(--borderWidth)] left-0 right-0 h-[var(--borderWidth)] bg-[#853605]"
	/>
	<div
		class="absolute -right-[var(--borderWidth)] bottom-0 top-0 w-[var(--borderWidth)] bg-[#853605]"
	/>

	<div
		class="absolute -bottom-[var(--borderWidth)] left-0 right-0 h-[var(--borderWidth)] bg-[#853605]"
	/>
	<div
		class="absolute -left-[var(--borderWidth)] bottom-0 top-0 w-[var(--borderWidth)] bg-[#853605]"
	/>
	<div
		class="absolute -bottom-[var(--shadowOffset)] -left-[calc(var(--shadowOffset)_-_4px)] right-0 -z-10 h-[8px] bg-[#926c41]"
	/>
	<div
		class="absolute -bottom-1 -left-[var(--shadowOffset)] top-[var(--shadowOffset)] -z-10 w-[6px] bg-[#926c41]"
	/>
</button>
