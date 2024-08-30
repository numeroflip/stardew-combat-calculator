<script lang="ts">
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from 'svelte-sonner';
	import { mode } from 'mode-watcher';

	type $$Props = SonnerProps;
</script>

<Sonner
	theme={$mode}
	class="toaster group max-w-[600px] lg:w-[450px]"
	toastOptions={{
		style: `width: fit-content;`,

		classes: {
			title: 'font-funky text-[21px] leading-6 text-surface-950',
			toast:
				'group toast bg-transparent group-[.toaster]:text-foreground group-[.toaster]:shadow-md  ',
			description: 'group-[.toast]:text-muted-foreground',
			actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
			cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground'
		}
	}}
	{...$$restProps}
/>
