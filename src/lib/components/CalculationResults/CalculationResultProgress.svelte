<script lang="ts">
	import { Progress } from '../ui/progress';

	export let max: number;
	export let value: number;
	export let baseValue: number;
	export let min: number | undefined = undefined;
	let className;
	export { className as class };
</script>

<div class="absolute -bottom-3 left-0 right-0 h-[10px] w-full sm:h-3 lg:-bottom-4 lg:h-3">
	<Progress
		{max}
		{value}
		{baseValue}
		{min}
		class="-z-10 h-full rounded-none border-3 border-[#44121c] bg-white/40 sm:border-3  sm:border-solid  "
		barClass={className}
	/>
	<div class="absolute -left-[0] -top-[0] z-[1] size-[3px] bg-[#fbc275] sm:block" />
	<div class="absolute -bottom-[0] -left-[0] z-[1] size-[3px] bg-[#fbc275] sm:block" />
	<div class="absolute -right-[0] -top-[0] z-[1] size-[3px] bg-[#fbc275] sm:block" />
	<div class="absolute -bottom-[0] -right-[0] z-[1] size-[3px] bg-[#fbc275] sm:block" />
</div>
