<script lang="ts">
	import { Slider as SliderPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import clsx from 'clsx';

	type $$Props = Omit<SliderPrimitive.Props, 'value'> & {
		value: number[];
		cap?: number;
	};

	let className: $$Props['class'] = undefined;
	export let cap: undefined | number = undefined;
	export let value: $$Props['value'];
	export { className as class };

	function getPercentage(_value: number, { max }: { max?: number }) {
		const maxVal = max ? max - 0 : 1;
		const val = _value ? _value - 0 : 0;

		return 100 - 100 * (val / maxVal);
	}

	const thumbWidth = '32px';
</script>

<div
	style={`--thumbWidth: ${thumbWidth}`}
	class="relative -mx-4 h-4 w-[calc(100%_+_(var(--thumbWidth)))] border-3 border-[#44121c] bg-[#bdac8f] px-[calc(var(--thumbWidth)_/_2)] [box-shadow:inset_-3px_3px_0px_rgb(67_27_7_/20%)]"
>
	<!-- CORNER PIXELS -->
	<div class="absolute -left-[3px] -top-[3px] z-[1] size-[3px] bg-[#fbc275] dark:bg-[#c4955b]" />
	<div class="absolute -bottom-[3px] -left-[3px] z-[1] size-[3px] bg-[#fbc275] dark:bg-[#c4955b]" />
	<div class="absolute -right-[3px] -top-[3px] z-[1] size-[3px] bg-[#fbc275] dark:bg-[#c4955b]" />
	<div
		class="absolute -bottom-[3px] -right-[3px] z-[1] size-[3px] bg-[#fbc275] dark:bg-[#c4955b]"
	/>
	<!--  -->

	<div class="relative h-full w-full">
		{#if cap}
			<div
				style={`left: calc((${thumbWidth} / 2) + (100% - ${getPercentage(cap, { max: $$props.max })}%)); right: calc(0px - (var(--thumbWidth) / 2));`}
				class="disabledPattern absolute z-0 h-full opacity-50 transition-all"
			/>
		{/if}
		<SliderPrimitive.Root
			{value}
			style={`max-width:  ${cap ? 100 - getPercentage(cap, { max: $$props.max }) : 100}%`}
			class={cn('relative flex h-full w-full touch-none select-none items-center   ', className)}
			{...$$restProps}
			max={$$props.cap ?? $$props.max}
			let:thumbs
		>
			<div class="flex h-full grow">
				<SliderPrimitive.Range class={clsx(' h-full w-full   ')} />
			</div>

			{#each thumbs as thumb}
				<SliderPrimitive.Thumb let:builder asChild {thumb}>
					<button
						use:builder.action
						{...builder}
						class={clsx(
							' absolute block h-full w-[var(--thumbWidth)] translate-x-0 bg-[#dc7b05]    shadow-theme-item-reverse outline outline-[3px] outline-[#5b2b2a] transition-colors  disabled:pointer-events-none  disabled:opacity-50 ',
							'cursor-pointer'
						)}
					>
					</button>
				</SliderPrimitive.Thumb>
			{/each}
		</SliderPrimitive.Root>
	</div>
</div>

<style>
	.disabledPattern {
		--size: 2px;
		--sizeDouble: calc(var(--size) * 2);

		--bg: rgb(0, 0, 0, 0.05);
		--fg: rgb(0, 0, 0, 0.3);
		background-color: var(--bg);

		background-image: repeating-linear-gradient(
				45deg,
				var(--fg) 25%,
				transparent 25%,
				transparent 75%,
				var(--fg) 75%,
				var(--fg)
			),
			repeating-linear-gradient(
				45deg,
				var(--fg) 25%,
				var(--bg) 25%,
				var(--bg) 75%,
				var(--fg) 75%,
				var(--fg)
			);
		background-position:
			0 0,
			var(--size) var(--size);
		background-size: var(--sizeDouble) var(--sizeDouble);
	}
</style>
