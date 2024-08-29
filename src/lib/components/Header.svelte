<script lang="ts">
	import {
		enchantmentStore,
		gemsStore,
		hasBlessingOfFangsStore,
		luckStore,
		ringStore,
		skillsStore,
		weaponNameStore,
		weaponStore
	} from '$lib/store/calculatorOptions';

	type $$Props = {
		handleShare: () => void;
		onSave: () => void;
		onLoad: () => void;
	};

	export let onLoad;
	export let onSave;
	export let handleShare: $$Props['handleShare'];

	function onReset() {
		gemsStore.reset();
		weaponNameStore.reset();
		ringStore.reset();
		gemsStore.reset();
		luckStore.reset();
		hasBlessingOfFangsStore.reset();
		skillsStore.reset();
		enchantmentStore.reset();
	}
</script>

<header
	class="w-full divide-y-3 divide-surface-900 overflow-x-clip border-b-[4px] border-surface-900 bg-surface-300 shadow-theme [grid-area:header] dark:bg-green-950/50"
>
	<h1
		class="h1 py-3 text-center font-stardewTitle text-2xl capitalize sm:text-4xl md:py-4 lg:text-5xl"
	>
		Stardew Combat calculator
	</h1>
	<div class="flex justify-center gap-2 bg-surface-100/30 p-1 text-xl">
		<button class=" bg-surface-300 px-3 py-1 shadow-theme-item" on:click={handleShare}>Share</button
		>
		<button class=" bg-surface-300 px-3 py-1 shadow-theme-item" on:click={onSave}>Save</button>
		<button class=" bg-surface-300 px-3 py-1 shadow-theme-item" on:click={onLoad}>Load</button>
		<button class=" bg-surface-300 px-3 py-1 shadow-theme-item" on:click={onReset}>Reset</button>
	</div>
</header>
