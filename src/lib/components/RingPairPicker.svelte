<script lang="ts">
	import { rings, type RingName } from '$model/ring.data';
	import RingPicker from './RingPicker.svelte';

	export let value: [RingName | undefined, RingName | undefined] = [undefined, undefined];
	export let focusedRings: [RingName | undefined, RingName | undefined] = [undefined, undefined];

	$: ring1 = value[0];
	$: ring2 = value[1];
</script>

<div class="flex pixel-corners">
	<RingPicker
		bind:value={value[0]}
		bind:focusedRing={focusedRings[0]}
		disabledRings={ring2 ? [ring2] : undefined}
	/>
	<RingPicker
		bind:value={value[1]}
		bind:focusedRing={focusedRings[1]}
		disabledRings={ring1 ? [ring1] : undefined}
	/>
</div>
