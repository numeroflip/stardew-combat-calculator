<script lang="ts">
	import Menu from './Menu/Menu.svelte';
	import Surface from './ui/Surface.svelte';

	let innerWidth: number;

	$: isLg = innerWidth >= 1024;
</script>

<svelte:window bind:innerWidth />
<Surface
	class="  mt-[-3px]  w-full shadow-theme  [grid-area:header]  md:flex md:items-center md:justify-between md:divide-none md:pr-4"
>
	<h1
		class="h1 text-text font-funky border-b-3 border-[#dc7b05] px-5 py-3 text-center text-2xl capitalize [text-shadow:2px_2px_0px_rgb(153,69,19,0.4)] sm:text-4xl md:border-none md:py-4 lg:text-5xl"
	>
		Stardew Combat calculator
	</h1>
	<Menu class="flex justify-around gap-2 p-1 pb-3 pt-3 text-xl" />
</Surface>
