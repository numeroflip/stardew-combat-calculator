<script lang="ts">
	import { luckStore } from '$lib/store/calculatorOptions';
	import { Slider } from './ui/slider';

	$: selectedLuck = $luckStore.selected;
	$: focusedLuck = $luckStore.dirty;
	$: shownLuck = focusedLuck ?? selectedLuck;
</script>

<Slider
	value={[shownLuck]}
	onValueChange={(val) => luckStore.setSelected(val[0])}
	max={6}
	min={0}
	step={1}
	bg="bg-slate-500"
/>
