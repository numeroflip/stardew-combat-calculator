<script lang="ts">
	import { rings } from '$model/ring.data';
	import RingPicker from './RingPicker.svelte';

    type RingKey = keyof typeof rings

	export let value: [RingKey | undefined, RingKey | undefined]  = [undefined, undefined]; 

	$: ring1 = value[0]
	$: ring2 = value[1]
	

</script>

<div class="flex  pixel-corners">
    <RingPicker bind:value={value[0]} disabledRings={ring2 ? [ring2] : undefined} />
    <RingPicker bind:value={value[1]} disabledRings={ring1 ? [ring1] : undefined} />
</div>
