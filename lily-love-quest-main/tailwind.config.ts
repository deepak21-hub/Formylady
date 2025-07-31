import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'handwriting': ['Dancing Script', 'cursive'],
				'body': ['Quicksand', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				romantic: {
					pink: 'hsl(var(--blush-pink))',
					lavender: 'hsl(var(--lavender))',
					white: 'hsl(var(--soft-white))',
					glow: 'hsl(var(--romantic-glow))',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-10px) rotate(1deg)' },
					'66%': { transform: 'translateY(-5px) rotate(-1deg)' }
				},
				'heartFloat': {
					'0%, 100%': { transform: 'translateY(0px) scale(1)', opacity: '0.7' },
					'25%': { transform: 'translateY(-20px) scale(1.1)', opacity: '1' },
					'50%': { transform: 'translateY(-30px) scale(1.05)', opacity: '0.8' },
					'75%': { transform: 'translateY(-15px) scale(1.08)', opacity: '0.9' }
				},
				'bloom': {
					'0%': { transform: 'scale(0.3) rotate(-180deg)', opacity: '0' },
					'50%': { transform: 'scale(0.7) rotate(-90deg)', opacity: '0.7' },
					'100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' }
				},
				'butterfly': {
					'0%, 100%': { transform: 'translateX(0px) translateY(0px) rotate(0deg)' },
					'25%': { transform: 'translateX(10px) translateY(-15px) rotate(5deg)' },
					'50%': { transform: 'translateX(-5px) translateY(-25px) rotate(-3deg)' },
					'75%': { transform: 'translateX(15px) translateY(-10px) rotate(7deg)' }
				},
				'sparkle': {
					'0%, 100%': { opacity: '0', transform: 'scale(0)' },
					'50%': { opacity: '1', transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'float-delayed': 'float 6s ease-in-out infinite -2s',
				'heart-float': 'heartFloat 8s ease-in-out infinite',
				'bloom': 'bloom 2s ease-out forwards',
				'butterfly': 'butterfly 12s ease-in-out infinite',
				'sparkle': 'sparkle 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
