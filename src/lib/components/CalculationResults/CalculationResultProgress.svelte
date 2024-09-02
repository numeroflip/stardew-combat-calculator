<script lang="ts">
	import { cn } from '$lib/utils';
	import { Progress } from '../ui/progress';

	export let max: number;
	export let value: number;
	export let baseValue: number;
	export let cap: number | undefined = undefined;
	export let min: number | undefined = undefined;
	let className;
	export { className as class };
</script>

<div class=" pixel-wrap-border relative h-[6px] w-full border-[#44121c] sm:h-2 lg:h-[8px]">
	<Progress
		{max}
		{value}
		{baseValue}
		{min}
		{cap}
		class="bright  h-full rounded-none   bg-white/40 dark:bg-[#bdac8f]   "
		barClass={cn('dark:brightness-105 border-solid border-r-3 border-[#44121c] ', className)}
	/>
</div>
