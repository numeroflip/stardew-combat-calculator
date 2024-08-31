<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes, HTMLBaseAttributes } from 'svelte/elements';

	type $$Props = HTMLBaseAttributes & {
		borderWidth?: number;
		shadow?: boolean;
	};
	export let borderWidth = 3;
	const shadowOffset = 6;
	export let shadow = true;

	let data: HTMLElement;
</script>

<div
	{...$$props}
	bind:this={data}
	style={`--bw: ${borderWidth}px; --shadowOffset: ${shadowOffset}px`}
	class={cn(
		'relative border-[#b14e05] bg-surface-gradient-light [border-width:var(--bw)] [box-shadow:inset_calc(0px_-_var(--bw))_var(--bw)_0_#e4ae6e]',
		$$props.class
	)}
>
	<slot />

	<!-- 2nd border -->
	<div
		role="presentation"
		class="absolute -left-[var(--bw)] -right-[var(--bw)] -top-[calc(var(--bw)*2)] z-[1] h-[var(--bw)] bg-[#dc7b05]"
	/>
	<div
		role="presentation"
		class="absolute -bottom-[var(--bw)] -right-[calc(var(--bw)*2)] -top-[var(--bw)] z-[1] w-[var(--bw)] bg-[#dc7b05]"
	/>

	<div
		role="presentation"
		class="absolute -bottom-[calc(var(--bw)*2)] -left-[var(--bw)] -right-[var(--bw)] z-[1] h-[var(--bw)] bg-[#dc7b05]"
	/>
	<div
		role="presentation"
		class="absolute -bottom-[var(--bw)] -left-[calc(var(--bw)*2)] -top-[var(--bw)] z-[1] w-[var(--bw)] bg-[#dc7b05]"
	/>

	<!-- 3rd border -->
	<div
		role="presentation"
		class="absolute -left-[var(--bw)] -right-[var(--bw)] -top-[calc(var(--bw)*3)] z-[1] h-[var(--bw)] bg-[#5b2b2a]"
	/>
	<div
		role="presentation"
		class="absolute -bottom-[var(--bw)] -right-[calc(var(--bw)*3)] -top-[var(--bw)] z-[1] w-[var(--bw)] bg-[#5b2b2a]"
	/>

	<div
		role="presentation"
		class="absolute -bottom-[calc(var(--bw)*3)] -left-[var(--bw)] -right-[var(--bw)] z-[1] h-[var(--bw)] bg-[#5b2b2a]"
	/>
	<div
		role="presentation"
		class="absolute -bottom-[var(--bw)] -left-[calc(var(--bw)*3)] -top-[var(--bw)] z-[1] w-[var(--bw)] bg-[#5b2b2a]"
	/>
	<!-- SHADOW -->
	{#if shadow}
		<div
			role="presentation"
			class="absolute -bottom-[var(--shadowOffset)] -left-[calc(var(--shadowOffset)_-_var(--bw))] right-0 -z-10 h-[8px] bg-[#926c41]"
		/>
		<div
			role="presentation"
			class="absolute -bottom-1 -left-[var(--shadowOffset)] top-[var(--shadowOffset)] -z-10 w-[6px] bg-[#926c41]"
		/>
	{/if}

	<!-- CORNERS -->
	<div
		role="presentation"
		class="absolute -left-[calc(var(--bw)*2)] -top-[calc(var(--bw)*2)] z-[1] size-[var(--bw)] bg-[#b14e05]"
	/>
	<div
		role="presentation"
		class="absolute -bottom-[calc(var(--bw)*2)] -left-[calc(var(--bw)*2)] z-[1] size-[var(--bw)] bg-[#b14e05]"
	/>
	<div
		role="presentation"
		class="absolute -right-[calc(var(--bw)*2)] -top-[calc(var(--bw)*2)] z-[1] size-[var(--bw)] bg-[#b14e05]"
	/>
	<div
		role="presentation"
		class="absolute -bottom-[calc(var(--bw)*2)] -right-[calc(var(--bw)*2)] z-[1] size-[var(--bw)] bg-[#b14e05]"
	/>
</div>
