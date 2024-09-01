<script lang="ts">
	import {
		lastLoadedOptionsKey,
		selectedCalculatorOptionsStore
	} from '$lib/store/calculatorOptions';
	import { DialogContent, DialogHeader, DialogTitle, Dialog, DialogTrigger } from '../ui/dialog';
	import { calculatorStorage } from '$lib/calculatorOptionsStorage';
	import { PinInput } from 'bits-ui';
	import Input from '../ui/Input.svelte';
	import Button from '../ui/Button.svelte';
	import FlagText from '../ui/FlagText.svelte';

	let value = '';
	let open = false;

	async function handleSave() {
		calculatorStorage.saveOptions($selectedCalculatorOptionsStore, value);
		$lastLoadedOptionsKey = value;
		open = false;
	}

	$: if (open) {
		value = $lastLoadedOptionsKey || '';
	}
</script>

<Dialog bind:open>
	<DialogTrigger><slot /></DialogTrigger>

	<DialogContent class="max-w-lg border-none bg-transparent p-0 shadow-none">
		<div
			class="dark:bg-surface-gradient-night bg-surface-gradient-light p-5 font-funky text-surface-900 shadow-theme"
		>
			<DialogHeader>
				<DialogHeader>
					<DialogTitle>
						<FlagText
							class="pointer-events-none relative -top-2 flex justify-center  text-2xl md:text-4xl"
							>Choose a name</FlagText
						></DialogTitle
					>
				</DialogHeader>
			</DialogHeader>
			<form
				class="mt-10"
				on:submit={(e) => {
					e.preventDefault();
					handleSave();
				}}
			>
				<div class="mt-5 flex flex-col items-center gap-5 md:gap-10">
					<Input
						required
						name="name"
						bind:value
						class=" h-9 bg-surface-300 px-3 font-stardew text-xl text-black dark:bg-surface-800/10"
					/>

					<Button class="self-end" type="submit">Save</Button>
				</div>
			</form>
		</div>
	</DialogContent>
</Dialog>
