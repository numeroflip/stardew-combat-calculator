<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	type $$Props = TabsPrimitive.TriggerProps;
	type $$Events = TabsPrimitive.TriggerEvents;

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'];
	export { className as class };
</script>

<TabsPrimitive.Trigger
	class={cn(
		' inline-flex items-center justify-center whitespace-nowrap bg-transparent px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[highlighted]:bg-surface-200 data-[state=active]:bg-surface-400/50 data-[highlighted]:text-accent-foreground data-[state=active]:text-foreground dark:text-black dark:data-[highlighted]:bg-surface-800/10 dark:data-[state=active]:bg-surface-800/30',
		className
	)}
	{value}
	{...$$restProps}
	on:click
>
	<slot />
</TabsPrimitive.Trigger>
