<script lang="ts">
	import { attackFromFoodStore } from '$lib/store/calculatorOptions';
	import { Slider } from './ui/slider';

	$: selectedAttack = $attackFromFoodStore.selected;
	$: focusedAttack = $attackFromFoodStore.dirty;

	$: shownAttack = focusedAttack ?? selectedAttack;
</script>

<Slider
	value={[shownAttack]}
	onValueChange={(val) => attackFromFoodStore.setSelected(val[0])}
	max={5}
	min={0}
	step={1}
/>
