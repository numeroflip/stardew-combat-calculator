<script lang="ts">
	import { Progress as ProgressPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import { number } from 'zod';

	type $$Props = ProgressPrimitive.Props & {
		value: number;
		baseValue?: number;
		barClass?: string;
		min?: number;
	};

	let className: $$Props['class'] = undefined;
	export let max: $$Props['max'] = 100;
	export let value: $$Props['value'];
	export let baseValue: $$Props['baseValue'] = 0;

	export let min: $$Props['min'] = 0;

	export { className as class };
	export let barClass = '';

	function getPercentage(_value: number, { max, min }: { max?: number; min?: number }) {
		const maxVal = max ? max - (min ?? 0) : 1;
		const val = _value ? _value - (min ?? 0) : 0;

		return 100 - 100 * (val / maxVal);
	}
</script>

<ProgressPrimitive.Root
	class={cn('relative h-3 w-full overflow-hidden rounded-full bg-secondary', className)}
	{...$$restProps}
>
	<div
		class={cn('h-full w-full flex-1 bg-primary shadow-theme-item transition-all', barClass)}
		style={`transform: translateX(-${getPercentage(value, { max, min })}%)`}
	></div>

	{#if baseValue}
		<div
			style={`transform: translateX(-${getPercentage(baseValue, { max, min })}%)`}
			class="absolute inset-0 top-0 z-10 h-full w-full bg-black/10 shadow-theme transition-all"
		/>
	{/if}
</ProgressPrimitive.Root>
