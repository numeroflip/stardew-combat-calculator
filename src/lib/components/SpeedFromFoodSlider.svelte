<script lang="ts">
	import { speedFromFoodStore } from '$lib/store/calculatorOptions';
	import { Slider } from './ui/slider';

	type SpeedAmount = number;

	$: selectedSpeed = $speedFromFoodStore.selected;
	$: focusedSpeed = $speedFromFoodStore.dirty;

	$: shownSpeed = focusedSpeed ?? selectedSpeed;
</script>

<Slider
	value={[shownSpeed]}
	onValueChange={(val) => speedFromFoodStore.setSelected(val[0])}
	max={2}
	bg="bg-surface-700"
	min={0}
	step={0.5}
/>
