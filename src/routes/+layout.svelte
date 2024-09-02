<script lang="ts">
	import '../app.css';
	const isClient = typeof window !== 'undefined';
	import bg from '$assets/images/bg.webp';
	import darkBg from '$assets/images/bg-dark.webp';
	import { Toaster } from '$lib/components/ui/sonner';
	import { darkModeStore } from '$lib/store/darkModeStore';

	$: img = $darkModeStore ? darkBg : bg;
</script>

<svelte:head>
	<meta name="color-scheme" content="dark light" />
</svelte:head>

<Toaster />

<div
	class="max-w-screen relative grid h-dvh overflow-hidden overflow-x-clip font-funky text-surface-900 dark:from-blue-950 dark:to-blue-900 dark:text-surface-500 lg:max-h-none lg:items-center lg:py-10"
>
	{#if isClient}
		<img class="fixed bottom-0 left-0 right-0 top-0 h-full w-full object-cover" src={img} alt="" />
	{/if}
	<slot />
</div>
