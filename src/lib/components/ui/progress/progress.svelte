<script lang="ts">
	import { Progress as ProgressPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	type $$Props = ProgressPrimitive.Props & {
		baseValue?: number;
		barClass?: string;
		min?: number;
	};

	let className: $$Props['class'] = undefined;
	export let max: $$Props['max'] = 100;
	export let value: $$Props['value'] = undefined;
	export let baseValue: $$Props['baseValue'] = 0;

	export { className as class };
	export let barClass = '';
</script>

<ProgressPrimitive.Root
	class={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
	{...$$restProps}
>
	<div
		class={cn('h-full w-full flex-1 bg-primary shadow-theme-item transition-all', barClass)}
		style={`transform: translateX(-${100 - (100 * (value ?? 0)) / (max ?? 1)}%)`}
	></div>
	<div
		style={`transform: translateX(-${100 - (100 * (baseValue ?? 0)) / (max ?? 1)}%)`}
		class="absolute inset-0 top-0 z-10 h-full w-full bg-transparent shadow-theme transition-all"
	/>
</ProgressPrimitive.Root>
