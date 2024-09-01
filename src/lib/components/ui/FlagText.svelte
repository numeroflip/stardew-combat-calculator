<script lang="ts">
	import Left from '$assets/images/flag/left.png';
	import Right from '$assets/images/flag/right.png';
	import Body from '$assets/images/flag/body.png';
	import { cn } from '$lib/utils';

	export let className = '';
	let data: HTMLElement;
	$: textLength = data?.textContent?.length || null;
	$: height = data?.scrollHeight ? data.scrollHeight + 15 : 50;
	export { className as class };
</script>

<div style={`--height: ${height}px`} class={cn('relative  flex text-3xl', className)}>
	<img src={Left} alt="" class="h-[var(--height)] dark:brightness-90" />

	<div class="relative grid h-[var(--height)] place-content-center">
		<img
			src={Body}
			alt=""
			class={cn(
				textLength && textLength > 10 ? 'object-fill' : 'object-cover',
				'absolute inset-0 -z-0  h-full w-full dark:brightness-90'
			)}
		/>
		<div
			bind:this={data}
			class="z-[1] font-funky font-normal text-text [text-shadow:1px_2px_0px_theme(colors.surface.400)]"
		>
			<slot />
		</div>
	</div>
	<img src={Right} alt="" class="h-[var(--height)] dark:brightness-90" />
</div>
