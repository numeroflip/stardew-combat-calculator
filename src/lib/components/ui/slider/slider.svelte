<script lang="ts">
	import { builderActions, Slider as SliderPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import clsx from 'clsx';

	type $$Props = SliderPrimitive.Props & {
		bg?: string;
	};

	let className: $$Props['class'] = undefined;
	export let bg: string = 'bg-surface-900';

	export let value: $$Props['value'] = [0];
	export { className as class };
</script>

<SliderPrimitive.Root
	bind:value
	class={cn('relative flex w-full touch-none select-none items-center  ', className)}
	{...$$restProps}
	let:thumbs
>
	<span class="relative h-2 w-full grow overflow-hidden rounded-full bg-surface-100">
		<SliderPrimitive.Range class={clsx('absolute h-full rounded-full  shadow-theme-item', bg)} />
	</span>
	{#each thumbs as thumb}
		<SliderPrimitive.Thumb let:builder asChild {thumb}>
			<button
				use:builder.action
				{...builder}
				class={clsx(
					' block size-5   rounded-full border-3 border-surface-900   bg-surface-100  ring-surface-900 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
					'cursor-pointer'
				)}
			>
			</button>
		</SliderPrimitive.Thumb>
	{/each}
</SliderPrimitive.Root>
