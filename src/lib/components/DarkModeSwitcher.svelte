<script lang="ts">
	import DayImg from '$assets/images/day-icon.png';
	import NightImg from '$assets/images/night-icon.png';
	import SystemImg from '$assets/images/console-icon.png';
	import { darkModeStore } from '$lib/store/darkModeStore';
	import { onMount } from 'svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';

	type DarkMode = 'light' | 'dark' | 'os';

	const imgSrc = new Map<DarkMode, string>([
		['light', DayImg],
		['dark', NightImg],
		['os', SystemImg]
	]);

	let systemMode: 'dark' | 'light' = 'light';
	let mode: DarkMode = 'os';
	let initialized = false;
	let userInteractedAt: Date | undefined = undefined;
	$: hideOsIcon = !userInteractedAt;

	onMount(() => {
		if (localStorage.getItem('theme')) {
			mode = localStorage.getItem('theme') as DarkMode;
			userInteractedAt = new Date();
		}

		const darkModequery = window.matchMedia('(prefers-color-scheme: dark)');

		systemMode = darkModequery?.matches ? 'dark' : 'light';

		const updateDarkMode = (event: MediaQueryListEvent) => {
			systemMode = event.matches ? 'dark' : 'light';
		};

		darkModequery.addEventListener('change', updateDarkMode);
		initialized = true;
		return () => {
			darkModequery.removeEventListener('change', updateDarkMode);
		};
	});

	$: activeMode = mode === 'os' ? systemMode : mode;

	$: {
		darkModeStore.set(activeMode === 'dark');
	}

	$: {
		if (activeMode === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	$: if (initialized) {
		if (mode === 'os') {
			localStorage.removeItem('theme');
		} else {
			localStorage.setItem('theme', mode);
		}
	}

	let nextMode: DarkMode;

	$: {
		if (hideOsIcon && mode === 'os') {
			nextMode = systemMode === 'dark' ? 'light' : 'dark';
		} else {
			nextMode = mode === 'os' ? 'light' : mode === 'light' ? 'dark' : 'os';
		}
	}
</script>

<div>
	<header class="sr-only">Theme selector</header>
	<p class="sr-only">current theme is {mode}</p>
	<Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<button
				use:builder.action
				{...builder}
				on:click={() => {
					if (!userInteractedAt) {
						userInteractedAt = new Date();
					}
					mode = nextMode;
				}}
				class="transition-all hover:brightness-110"
			>
				<img
					class="size-6 object-contain sm:size-8"
					src={imgSrc.get(hideOsIcon ? activeMode : mode)}
					alt=""
				/>
				<p class="sr-only">Set theme to {nextMode}</p>
			</button>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Set theme to {nextMode}</p>
		</Tooltip.Content>
	</Tooltip.Root>
</div>
