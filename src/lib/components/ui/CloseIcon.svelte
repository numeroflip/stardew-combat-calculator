<script lang="ts">
	import closeIcon from '$assets/icons/close.svg?raw';
	import { cn } from '$lib/utils';
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import PixelBorders from './PixelBorders.svelte';

	type $$Props = DialogPrimitive.ContentProps;

	let className: $$Props['class'] = undefined;

	export { className as class };
</script>

<div
	class={cn(
		'relative text-red-600 transition-all *:stroke-red-400 *:stroke-1 hover:scale-110',
		className
	)}
>
	<PixelBorders />
	{@html closeIcon}
	<span class="sr-only">Close</span>
</div>
