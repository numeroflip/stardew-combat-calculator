<script lang="ts">
	import {
		lastLoadedOptionsKey,
		selectedCalculatorOptionsStore
	} from '$lib/store/calculatorOptions';
	import { DialogContent, DialogHeader, DialogTitle, Dialog, DialogTrigger } from '../ui/dialog';
	import { Button } from '../ui/button';
	import { calculatorStorage } from '$lib/calculatorOptionsStorage';

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

<Dialog portal={document.querySelector('main')} bind:open>
	<DialogTrigger>
		<slot />
	</DialogTrigger>

	<DialogContent class=" bg-gradient-to-br from-surface-200 to-surface-300/80 shadow-theme">
		<DialogHeader>
			<DialogTitle class="text-3xl font-normal">Choose a name for the configuration</DialogTitle>
		</DialogHeader>
		<form
			on:submit={(e) => {
				e.preventDefault();
				handleSave();
			}}
		>
			<div class="mt-5 flex flex-col items-center gap-5">
				<input
					class="mx-auto w-fit border-none bg-surface-300 px-4 py-2 text-lg shadow-theme-item"
					required
					name="name"
					bind:value
				/>
				<Button
					variant="defaultLight"
					size="sm"
					class="w-fit  bg-surface-300 px-5 py-0 text-lg leading-7 shadow-theme-item"
					type="submit">Save</Button
				>
			</div>
		</form>
	</DialogContent>
</Dialog>
