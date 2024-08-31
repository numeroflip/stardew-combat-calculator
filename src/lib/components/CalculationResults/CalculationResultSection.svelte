<script lang="ts">
	import { cn } from '$lib/utils';

	type $$Props = {
		class?: string;
	};

	let className = '';
	export { className as class };
</script>

<section class={cn('flex w-full flex-col px-2 sm:px-0', className)}>
	<div
		class={cn(
			'relative z-10 flex items-center px-1 py-0 text-base text-black/80 sm:text-lg md:text-xl'
		)}
	>
		<slot />
	</div>
	<slot name="progress" />
</section>
