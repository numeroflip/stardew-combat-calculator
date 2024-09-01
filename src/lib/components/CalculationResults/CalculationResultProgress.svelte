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

<div class="relative h-[10px] w-full sm:h-3 lg:h-3">
	<Progress
		{max}
		{value}
		{baseValue}
		{min}
		{cap}
		class="bright h-full rounded-none border-3 border-[#44121c]  bg-white/40 dark:bg-[#bdac8f] sm:border-3   sm:border-solid  "
		barClass={cn('dark:brightness-105 border-solid border-r-3 border-[#44121c] ', className)}
	/>

	<div
		class="absolute -left-[0] -top-[0] z-[1] size-[3px] bg-[#fbc275] transition-colors dark:bg-[#c4955b] sm:block sm:size-[3px]"
	/>
	<div
		class="absolute -bottom-[0] -left-[0] z-[1] size-[3px] bg-[#fbc275] transition-colors dark:bg-[#c4955b] sm:block sm:size-[3px]"
	/>
	<div
		class="absolute -right-[0] -top-[0] z-[1] size-[3px] bg-[#fbc275] transition-colors dark:bg-[#c4955b] sm:block sm:size-[3px]"
	/>
	<div
		class="absolute -bottom-[0] -right-[0] z-[1] size-[3px] bg-[#fbc275] transition-colors dark:bg-[#c4955b] sm:block sm:size-[3px]"
	/>
</div>
