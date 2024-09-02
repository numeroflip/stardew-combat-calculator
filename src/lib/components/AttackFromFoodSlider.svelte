<script lang="ts">
	import { attackFromFoodStore } from '$lib/store/calculatorOptions';
	import { Slider } from './ui/slider';

	$: selectedAttack = $attackFromFoodStore.selected;
	$: focusedAttack = $attackFromFoodStore.dirty;

	$: shownAttack = focusedAttack ?? selectedAttack;
	const cap = 5;
</script>

<Slider
	value={[shownAttack]}
	onValueChange={(val) => {
		if (val[0] > cap) {
			return;
		} else {
			attackFromFoodStore.setSelected(val[0]);
		}
	}}
	max={6}
	cap={5}
	min={0}
	step={1}
/>
