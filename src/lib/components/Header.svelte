<script lang="ts">
	import Menu from './Menu/Menu.svelte';
	import Surface from './ui/Surface.svelte';
</script>

<Surface
	shadow={false}
	class="  z-20 mx-[-3px] my-[-3px]  w-[calc(100%+6px)] shadow-theme  [grid-area:header]  md:flex md:items-center md:justify-between md:divide-none md:pr-4"
>
	<h1
		class="h1 px-5 py-2 text-center font-funky text-3xl capitalize text-text [text-shadow:-2px_2px_0px_rgb(153,69,19,0.4)] sm:py-3 sm:text-4xl md:border-none md:py-4 xl:text-5xl"
	>
		Stardew Combat calculator
	</h1>
	<Menu class="flex justify-around gap-2 p-1 pb-3 pt-3 text-xl shadow-theme md:shadow-none" />
</Surface>
