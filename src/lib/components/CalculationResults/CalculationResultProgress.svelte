<script lang="ts">
	import { Progress } from '../ui/progress';

	export let max: number;
	export let value: number;
	export let baseValue: number;
	let className;
	export { className as class };
</script>

<div class="absolute -bottom-2 left-0 right-0 h-2">
	<Progress
		{max}
		{value}
		{baseValue}
		class="-z-10 h-full rounded-none border-surface-900/10 bg-white/40  "
		barClass={className}
	/>
</div>
