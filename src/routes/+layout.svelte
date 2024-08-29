<script>
	import '../app.css';
	const isClient = typeof window !== 'undefined';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<Toaster />

<div
	class="max-w-screen max-h-screen overflow-hidden overflow-x-clip bg-gradient-to-b from-[#144683] to-[#258BF0] font-stardewTitle text-surface-900 dark:from-blue-950 dark:to-blue-900 dark:text-surface-500 lg:max-h-none lg:py-10"
>
	{#if isClient}
		<slot />
	{/if}
</div>

<style>
	.main-grid {
		display: grid;
		grid-template-rows: auto 1fr auto;
		overflow: hidden;
		height: 100dvh;
		grid-template-areas:
			'header'
			'options'
			'results';

		@screen md {
			grid-template-areas:
				'header header'
				'options results';
		}
	}
</style>
