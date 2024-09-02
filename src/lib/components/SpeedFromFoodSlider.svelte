<script lang="ts">
	import { speedFromFoodStore } from '$lib/store/calculatorOptions';
	import { Slider } from './ui/slider';

	$: selectedSpeed = $speedFromFoodStore.selected;
	$: focusedSpeed = $speedFromFoodStore.dirty;

	$: shownSpeed = focusedSpeed ?? selectedSpeed;
</script>

<Slider
	value={[shownSpeed]}
	onValueChange={(val) => speedFromFoodStore.setSelected(val[0])}
	max={6}
	cap={2}
	min={0}
	step={0.5}
/>
