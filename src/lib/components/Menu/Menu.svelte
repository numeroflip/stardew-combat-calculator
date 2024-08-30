<script lang="ts">
	import {
		enchantmentStore,
		gemsStore,
		blessingStore,
		luckStore,
		ringStore,
		selectedCalculatorOptionsStore,
		skillsStore,
		weaponNameStore,
		speedFromFoodStore
	} from '$lib/store/calculatorOptions';
	/* 	import SaveIcon from '/icons/saveIcon.svg';
	 */ import { toast } from 'svelte-sonner';
	import queryString from 'query-string';
	import SaveConfigurationDialog from './SaveConfigurationDialog.svelte';
	import LoadConfigDialog from './LoadConfigDialog.svelte';
	import clsx from 'clsx';
	import Button from '../ui/Button.svelte';
	import FlagText from '../ui/FlagText.svelte';
	import ShareNotificationToaster from './ShareNotificationToaster.svelte';

	function onReset() {
		gemsStore.reset();
		weaponNameStore.reset();
		ringStore.reset();
		gemsStore.reset();
		luckStore.reset();
		blessingStore.reset();
		skillsStore.reset();
		enchantmentStore.reset();
		speedFromFoodStore.reset();
	}

	function handleShare() {
		const params = queryString.stringify({
			options: JSON.stringify($selectedCalculatorOptionsStore)
		});
		const link = `${window.location.origin}?${params}`;

		if (navigator?.share) {
			navigator.share({ text: link });
		} else {
			navigator.clipboard.writeText(link);
			toast(ShareNotificationToaster, {
				unstyled: true
			});
		}
	}

	export let className = '';

	export { className as class };
</script>

<div class={clsx('flex gap-4', className)}>
	<Button on:click={handleShare}>
		<img src="/icons/share.svg" alt="" class="hidden size-4 object-cover sm:block" />
		<div class="relative text-lg">Share</div></Button
	>

	<LoadConfigDialog>
		<Button>
			<img src="/icons/load.svg" alt="" class="hidden size-5 object-cover sm:block" />
			<div class="relative text-lg">Load</div>
		</Button>
	</LoadConfigDialog>
	<Button class="bg-red-400" on:click={onReset}>
		<img
			src="/icons/close.svg"
			alt=""
			class="relative bottom-[2px] hidden size-6 object-cover sm:block"
		/>
		<div class="relative text-lg">Reset</div>
	</Button>
	<SaveConfigurationDialog>
		<Button class="bg-green-600 ">
			<img
				src="/icons/save.svg"
				alt=""
				class="relative bottom-[2px] hidden size-5 object-cover sm:block"
			/>
			<div class="relative text-lg">Save</div>
		</Button>
	</SaveConfigurationDialog>
</div>
