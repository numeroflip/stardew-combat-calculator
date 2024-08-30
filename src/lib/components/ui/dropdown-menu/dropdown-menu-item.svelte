<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import { dropdownItemVariants } from '.';

	type $$Props = DropdownMenuPrimitive.ItemProps & {
		inset?: boolean;
		variant?: 'default' | 'light' | 'pixelated';
	};
	type $$Events = DropdownMenuPrimitive.ItemEvents;

	let className: $$Props['class'] = undefined;
	export let inset: $$Props['inset'] = undefined;
	export let variant: $$Props['variant'] = 'default';
	export { className as class };
</script>

<DropdownMenuPrimitive.Item
	class={cn(dropdownItemVariants({ variant }), inset && 'pl-8', className)}
	{...$$restProps}
	on:click
	on:keydown
	on:focusin
	on:focusout
	on:pointerdown
	on:pointerleave
	on:pointermove
>
	<slot />
</DropdownMenuPrimitive.Item>
