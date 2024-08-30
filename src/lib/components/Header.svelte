<script lang="ts">
	import Menu from './Menu/Menu.svelte';

	let innerWidth: number;

	$: isLg = innerWidth >= 1024;
</script>

<svelte:window bind:innerWidth />
<header
	class="w-full overflow-x-clip border-b-[4px] border-surface-900 bg-surface-gradient-light shadow-theme [grid-area:header] dark:bg-green-950/50 md:flex md:items-center md:justify-between md:divide-none md:pr-4"
>
	<h1
		class="h1 text-text font-funky px-5 py-3 text-center text-2xl capitalize [text-shadow:2px_2px_0px_rgb(153,69,19,0.4)] sm:text-4xl md:py-4 lg:text-5xl"
	>
		Stardew Combat calculator
	</h1>
	<Menu class="flex justify-around gap-2 p-1 pb-3 text-xl" />
</header>
