<script lang="ts">
	import { Slider as SliderPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import clsx from 'clsx';

	type $$Props = Omit<SliderPrimitive.Props, 'value'> & {
		bg?: string;
		value: number[];
	};

	let className: $$Props['class'] = undefined;
	export let bg: string = 'bg-surface-900';

	export let value: $$Props['value'];
	export { className as class };
</script>

<div>
	<SliderPrimitive.Root
		{value}
		class={cn('relative flex w-full touch-none select-none items-center   ', className)}
		{...$$restProps}
		let:thumbs
	>
		<div
			class="relative -mx-4 h-4 w-full grow border-3 border-[#44121c] bg-[#bdac8f] [box-shadow:inset_-3px_3px_0px_rgb(67_27_7_/20%)]"
		>
			<SliderPrimitive.Range class={clsx('absolute h-full   ')} />
			<div
				class="absolute -left-[3px] -top-[3px] z-[1] size-[3px] bg-[#fbc275] dark:bg-[#c4955b]"
			/>
			<div
				class="absolute -bottom-[3px] -left-[3px] z-[1] size-[3px] bg-[#fbc275] dark:bg-[#c4955b]"
			/>
			<div
				class="absolute -right-[3px] -top-[3px] z-[1] size-[3px] bg-[#fbc275] dark:bg-[#c4955b]"
			/>
			<div
				class="absolute -bottom-[3px] -right-[3px] z-[1] size-[3px] bg-[#fbc275] dark:bg-[#c4955b]"
			/>
		</div>
		{#each thumbs as thumb}
			<SliderPrimitive.Thumb let:builder asChild {thumb}>
				<button
					use:builder.action
					{...builder}
					class={clsx(
						' absolute  block h-full w-8 translate-x-0   border-3 border-[#5b2b2a] bg-[#dc7b05] shadow-theme-item-reverse transition-colors focus:outline-none disabled:pointer-events-none  disabled:opacity-50 ',
						'cursor-pointer'
					)}
				>
				</button>
			</SliderPrimitive.Thumb>
		{/each}
	</SliderPrimitive.Root>
</div>
