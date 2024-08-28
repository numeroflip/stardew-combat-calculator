<script lang="ts">
	type $$Props = {
		class: string;
		percent: number;
	};

	let className = '';
	export let percent;
	export { className as class };
</script>

<div class="absolute bottom-0 left-0 right-0 h-1 bg-surface-800/20">
	<div style={`width: ${percent}%;`} class={`absolute bottom-0 left-0 h-1 ${className}`} />
</div>
