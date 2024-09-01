<script lang="ts">
	import { type Blessing } from '$model/calculatorOptions';
	import { blessingSchema } from '$model/calculatorOptions';
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
		},
		{
			value: 'fangs',
			img: 'https://stardewvalleywiki.com/mediawiki/images/a/af/Blessing_Of_Fangs.png',
			tooltip: {
				title: 'Blessing of Fangs',
				description: '+10% crit chance'
			}
		}
	];
</script>

<ToggleGroup.Root
	value={$blessingStore.selected || ''}
	type="single"
	onValueChange={(val) => {
		const validated = blessingSchema.safeParse(val);
		blessingStore.setSelected(validated.data || undefined);
	}}
	class=" mx-auto grid w-full max-w-96 grid-cols-3 gap-0 divide-x-3 divide-surface-300/60   "
>
	{#each blessings as blessing}
		{@const isSelected = $blessingStore.selected === blessing.value}
		<Tooltip.Root openDelay={700} closeDelay={200}>
			<Tooltip.Trigger class="">
				<ToggleGroupItem
					class={clsx(
						' relative h-14 w-full rounded-none font-sans  text-amber-900 shadow-theme-item hover:bg-surface-400/40 active:bg-surface-400/60'
					)}
					size="unset"
					variant="default"
					value={blessing.value}
				>
					<img
						src={blessing.img}
						alt={blessing.value}
						class={clsx(
							isSelected ? '' : 'opacity-20  grayscale',
							' relative  size-9  object-cover '
						)}
					/>
					<div class="pointer-events-none absolute bottom-[-2px] left-[6px] capitalize opacity-50">
						{blessing.value}
					</div>
				</ToggleGroupItem>
			</Tooltip.Trigger>
			<Tooltip.Content class="">
				<p class="mb-1 text-base text-black">{blessing.tooltip.title}</p>
				<p class="text-slate-900/50">{blessing.tooltip.description}</p>
			</Tooltip.Content>
		</Tooltip.Root>
	{/each}
</ToggleGroup.Root>
