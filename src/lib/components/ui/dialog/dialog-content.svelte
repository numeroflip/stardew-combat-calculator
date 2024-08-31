<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import X from 'lucide-svelte/icons/x';
	import * as Dialog from './index.js';
	import { cn, flyAndScale } from '$lib/utils.js';
	import Surface from '../Surface.svelte';
	import PixelBorders from '../PixelBorders.svelte';

	import closeIcon from '$assets/icons/close.svg?raw';
	import CloseIcon from '../CloseIcon.svelte';

	type $$Props = DialogPrimitive.ContentProps;

	let className: $$Props['class'] = undefined;
	export let transition: $$Props['transition'] = flyAndScale;
	export let transitionConfig: $$Props['transitionConfig'] = {
		duration: 200
	};
	export { className as class };
</script>

<Dialog.Portal>
	<Dialog.Overlay />
	<DialogPrimitive.Content
		{transition}
		{transitionConfig}
		class={cn(
			'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-surface-gradient-light  p-6  sm:rounded-lg md:w-full',
			className
		)}
		{...$$restProps}
	>
		<Surface class="mx-2">
			<slot />
		</Surface>

		<DialogPrimitive.Close
			class="absolute right-4 top-2 rounded-sm bg-[#ffd284] opacity-70 ring-offset-background  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
		>
			<CloseIcon />
		</DialogPrimitive.Close>
	</DialogPrimitive.Content>
</Dialog.Portal>
