<script lang="ts">
	import type { Blessing } from '$model/calculatorOptions';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import * as Tooltip from '../ui/tooltip';
	import ToggleGroupItem from '../ui/toggle-group/toggle-group-item.svelte';
	import { blessingStore } from '$lib/store/calculatorOptions';
	import clsx from 'clsx';

	const blessings: {
		value: Blessing;
		img: string;
		tooltip: {
			title: string;
			description: string;
		};
	}[] = [
		{
			value: 'fangs',
			img: 'https://stardewvalleywiki.com/mediawiki/images/a/af/Blessing_Of_Fangs.png',
			tooltip: {
				title: 'Blessing of Fangs',
				description: '+10% crit chance'
			}
		},
		{
			value: 'luck',
			img: 'https://stardewvalleywiki.com/mediawiki/images/thumb/6/6e/Blessing_Of_Luck.png/36px-Blessing_Of_Luck.png',
			tooltip: {
				title: 'Blessing of Luck',
				description: '+1 Luck'
			}
		},
		{
			value: 'speed',
			img: 'https://stardewvalleywiki.com/mediawiki/images/6/67/Blessing_Of_Speed.png',
			tooltip: {
				title: 'Blessing of Speed',
				description: '+0.5 speed'
			}
		}
	];

	let value: Blessing | undefined;

	$: {
		blessingStore.setSelected(value);
	}
</script>

<ToggleGroup.Root bind:value type="single">
	{#each blessings as blessing}
		{@const isSelected = value === blessing.value}
		<Tooltip.Root openDelay={700} closeDelay={200}>
			<Tooltip.Trigger>
				<ToggleGroupItem
					on:select={() => {
						blessingStore.setSelected(blessing.value);
					}}
					class={'pixel-corners--sm md:pixel-corners size-14 md:size-16'}
					size="unset"
					value={blessing.value}
				>
					<img
						src={blessing.img}
						alt={blessing.value}
						class={clsx(
							isSelected ? '' : 'opacity-50 grayscale',
							' size-8 object-cover md:size-10'
						)}
					/>
				</ToggleGroupItem>
			</Tooltip.Trigger>
			<Tooltip.Content class="pixel-corners--sm px-5 text-center font-stardewTitle text-lg">
				<p class="text-surface-900">{blessing.tooltip.title}</p>
				<p class="text-surface-900/50">{blessing.tooltip.description}</p>
			</Tooltip.Content>
		</Tooltip.Root>
	{/each}
</ToggleGroup.Root>
