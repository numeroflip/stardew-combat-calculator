import defaultTheme from 'tailwindcss/defaultTheme';
import bcontainerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			borderWidth: {
				3: '3px'
			},
			fontFamily: {
				funky: ['Stardew Cursive', ...defaultTheme.fontFamily.sans],
				stardew: ['Stardew', ...defaultTheme.fontFamily.sans],
				sans: ['Stardew', ...defaultTheme.fontFamily.sans]
			},
			boxShadow: {
				'inner-lg': 'inset 0 8px 8px 0 rgb(67 27 7 / 10%)',
				theme: 'inset 0px 0px 0px 4px rgb(67 27 7 /10%)',
				'theme-item':
					'inset -3px 3px 0px rgb(67 27 7 /20%),inset 3px -3px 0px rgb(255 255 255 /47%)',
				'theme-item-reverse':
					'inset -3px 3px 0px rgb(255 255 255 /47%),inset 3px -3px 0px rgb(67 27 7 /20%)'
			},
			backgroundImage: {
				'blue-gradient': 'linear-gradient(to bottom, #144683 0%, #258BF0 100%)',
				'blue-gradient-light': 'linear-gradient(to bottom, #262448 0%, #1d1c21 100%)',
				'night-gradient': 'linear-gradient(to top, #0f2027 0%, #203a43 100%)',
				'surface-gradient': 'linear-gradient(to top, #eba867 0%, #ffcb7b 100%)',
				'surface-gradient-night': 'linear-gradient(to top,#bc8753 0%, #cca262 100%)',
				'surface-gradient-night-dark': 'linear-gradient(to top,#a3814e 0%, #966c42 100%)',

				'surface-gradient-light': 'linear-gradient(to top, #f8ba70 0%, #ffcb7b 100%)'
			},

			colors: {
				text: '#56160c',
				title: '#994513',
				surface: {
					DEFAULT: '#FCCB78',
					light: '#ffd789',
					50: '#fff9ed',
					100: '#fff2d5',
					150: '#FAE7C2',
					200: '#F6D89D',
					300: '#fccb78',
					400: '#faa83d',
					500: '#f78d18',
					600: '#e8730e',
					700: '#c1570d',
					800: '#994513',
					900: '#7b3913',
					950: '#431b07'
				},
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [bcontainerQueries]
};

export default config;
