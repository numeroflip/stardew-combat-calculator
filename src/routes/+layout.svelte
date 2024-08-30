<script>
	import '../app.css';
	const isClient = typeof window !== 'undefined';
	import bg from '$assets/images/bg.webp';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<Toaster />

<div
	class="max-w-screen font-funky relative grid h-dvh overflow-hidden overflow-x-clip text-surface-900 dark:from-blue-950 dark:to-blue-900 dark:text-surface-500 lg:max-h-none lg:items-center lg:py-10"
>
	<img class="fixed bottom-0 left-0 right-0 top-0 h-full w-full object-cover" src={bg} alt="" />
	{#if isClient}
		<slot />
	{/if}
</div>
