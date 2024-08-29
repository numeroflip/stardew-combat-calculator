import { type VariantProps, tv } from 'tailwind-variants';
import type { Button as ButtonPrimitive } from 'bits-ui';
import Root from './button.svelte';

const buttonVariants = tv({
	base: ' focus-visible:ring-ring items-center justify-center whitespace-nowrap  text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	variants: {
		variant: {
			default:
				'shadow-theme-item bg-surface-300 text-amber-900 hover:bg-surface-400/40 active:bg-surface-400/60',
			defaultLight:
				'shadow-theme-item bg-surface-50 text-amber-900 hover:bg-surface-200/40 active:bg-surface-200/60',
			pixelated:
				'bg-surface-50  rounded-md text-surface-900 hover:bg-white active:bg-surface-50/80 pixel-corners',
			pixelatedDynamic:
				'bg-surface-50  rounded-md text-surface-900 hover:bg-white active:bg-surface-50/80 pixel-corners--sm md:pixel-corners',
			lightBase: 'bg-surface-50 text-surface-900 hover:bg-white active:bg-surface-50/80',
			destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
			outline: 'border-input bg-background hover:bg-accent hover:text-accent-foreground border',
			secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
			ghost: 'hover:bg-accent hover:text-accent-foreground',
			link: 'text-primary underline-offset-4 hover:underline'
		},
		pixelation: {
			base: 'pixel-corners',
			dynamic: 'pixel-corners--sm md:pixel-corners'
		},
		size: {
			default: 'h-10 px-4 py-2',
			sm: 'h-9  px-3',
			lg: 'h-11  px-8',
			icon: 'h-10 w-10',
			unset: ''
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
});

type Variant = VariantProps<typeof buttonVariants>['variant'];
type Size = VariantProps<typeof buttonVariants>['size'];

type Props = ButtonPrimitive.Props & {
	variant?: Variant;
	size?: Size;
};

type Events = ButtonPrimitive.Events;

export {
	Root,
	type Props,
	type Events,
	//
	Root as Button,
	type Props as ButtonProps,
	type Events as ButtonEvents,
	buttonVariants
};
