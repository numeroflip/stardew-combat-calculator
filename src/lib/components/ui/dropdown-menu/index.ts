import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import Item from './dropdown-menu-item.svelte';
import Label from './dropdown-menu-label.svelte';
import Content from './dropdown-menu-content.svelte';
import Shortcut from './dropdown-menu-shortcut.svelte';
import RadioItem from './dropdown-menu-radio-item.svelte';
import Separator from './dropdown-menu-separator.svelte';
import RadioGroup from './dropdown-menu-radio-group.svelte';
import SubContent from './dropdown-menu-sub-content.svelte';
import SubTrigger from './dropdown-menu-sub-trigger.svelte';
import CheckboxItem from './dropdown-menu-checkbox-item.svelte';
import { tv } from 'tailwind-variants';

export type DropdownVariant = 'default' | 'light' | 'pixelated';

export const dropdownItemVariants = tv({
	base: ' mb-1 flex cursor-default select-none items-center rounded-none  border-none px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none  data-[disabled]:opacity-50',
	variants: {
		variant: {
			default:
				'bg-surface data-[highlighted]:bg-white/20 data-[highlighted]:text-accent-foreground',
			light:
				'shadow-theme-item bg-surface-50 data-[highlighted]:bg-surface-400/50 data-[highlighted]:text-accent-foreground',
			pixelated:
				'pixel-corners--sm md:pixel-corners bg-transparent data-[highlighted]:bg-surface-200 data-[highlighted]:text-accent-foreground'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

export const dropdownContentVariants = tv({
	base: 'z-50 min-w-[8rem] p-1 text-popover-foreground focus:outline-none',
	variants: {
		variant: {
			default: 'bg-surface border-4 border-surface-900 shadow-theme',
			light: 'bg-surface-100 border-4 border-surface-900 shadow-theme',
			pixelated: 'pixel-border text-surface-900 bg-surface-50/60 backdrop-blur-md'
		}
	}
});

const Sub = DropdownMenuPrimitive.Sub;
const Root = DropdownMenuPrimitive.Root;
const Trigger = DropdownMenuPrimitive.Trigger;
const Group = DropdownMenuPrimitive.Group;

export {
	Sub,
	Root,
	Item,
	Label,
	Group,
	Trigger,
	Content,
	Shortcut,
	Separator,
	RadioItem,
	SubContent,
	SubTrigger,
	RadioGroup,
	CheckboxItem,
	//
	Root as DropdownMenu,
	Sub as DropdownMenuSub,
	Item as DropdownMenuItem,
	Label as DropdownMenuLabel,
	Group as DropdownMenuGroup,
	Content as DropdownMenuContent,
	Trigger as DropdownMenuTrigger,
	Shortcut as DropdownMenuShortcut,
	RadioItem as DropdownMenuRadioItem,
	Separator as DropdownMenuSeparator,
	RadioGroup as DropdownMenuRadioGroup,
	SubContent as DropdownMenuSubContent,
	SubTrigger as DropdownMenuSubTrigger,
	CheckboxItem as DropdownMenuCheckboxItem
};
