<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export let value = '';

	type $$Props = HTMLInputAttributes;
</script>

<div class="relative">
	<input {...$$props} bind:value />
	<div class="absolute -top-[4px] left-0 right-0 h-[4px] bg-[#5b2b2a]" />
	<div class="absolute -right-[4px] bottom-0 top-0 w-[4px] bg-[#5b2b2a]" />

	<div class="absolute -bottom-[4px] left-0 right-0 h-[4px] bg-[#965c3a]" />
	<div class="absolute -left-[4px] bottom-0 top-0 w-[4px] bg-[#965c3a]" />

	<div class="absolute -bottom-[8px] left-0 right-0 h-[4px] bg-[#cca46c]" />
	<div class="absolute -left-[8px] bottom-0 top-0 w-[4px] bg-[#cca46c]" />

	<div class="absolute -left-[4px] -top-[4px] size-[4px] bg-[#a88660]" />
	<div class="absolute -bottom-[4px] -left-[4px] size-[4px] bg-[#a88660]" />
	<div class="absolute -right-[4px] -top-[4px] size-[4px] bg-[#a88660]" />
	<div class="absolute -bottom-[4px] -right-[4px] size-[4px] bg-[#a88660]" />
</div>
