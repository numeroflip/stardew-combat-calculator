<script lang="ts">
	import { cn } from '$lib/utils';
	import RingPicker from './RingPicker.svelte';

	let className = '';

	export let type: 'left' | 'right';

	export { className as class };
</script>

<div class={cn('pixel-corners  flex gap-[2px]', className)}>
	<RingPicker class="pl-1" index={0} {type} />
	<RingPicker class="pr-1" index={1} {type} />
</div>
