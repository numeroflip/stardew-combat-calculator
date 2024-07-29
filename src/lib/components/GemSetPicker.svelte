<script lang="ts">
	import type { GemName } from '$model/gem';
	import GemPicker from './GemPicker.svelte';

	type GemSet = [GemName | undefined, GemName | undefined, GemName | undefined];

	let selectedGems: GemSet = [undefined, undefined, undefined];

	let focusedGems: GemSet = [undefined, undefined, undefined];

	let shownGems: GemSet = [undefined, undefined, undefined];

	$: shownGems = [
		focusedGems[0] || selectedGems[0],
		focusedGems[1] || selectedGems[1],
		focusedGems[2] || selectedGems[2]
	];
</script>

<GemPicker />
<GemPicker />
<GemPicker />
