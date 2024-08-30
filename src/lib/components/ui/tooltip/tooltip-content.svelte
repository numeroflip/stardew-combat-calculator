<script lang="ts">
	import { Tooltip as TooltipPrimitive } from 'bits-ui';
	import { cn, flyAndScale } from '$lib/utils.js';
	import FlagText from '../FlagText.svelte';
	import Surface from '../Surface.svelte';

	type $$Props = TooltipPrimitive.ContentProps;

	let className: $$Props['class'] = undefined;
	export let sideOffset: $$Props['sideOffset'] = 4;
	export let transition: $$Props['transition'] = flyAndScale;
	export let transitionConfig: $$Props['transitionConfig'] = {
		y: 8,
		duration: 150
	};
	export { className as class };
</script>

<TooltipPrimitive.Content
	{transition}
	{transitionConfig}
	{sideOffset}
	class={cn('z-50 overflow-visible  border  text-sm text-popover-foreground ')}
	{...$$restProps}
>
	<Surface
		borderWidth={2}
		class={cn('h-full w-full px-2 py-1.5  font-stardew text-black ', className)}
	>
		<slot />
	</Surface>
</TooltipPrimitive.Content>
