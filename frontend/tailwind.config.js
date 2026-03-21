/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['DM Sans', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                },
                /* InFinea brand tokens */
                brand: {
                    primary: '#275255',
                    teal: '#459492',
                    secondary: '#55B3AE',
                    green: '#5DB786',
                    coral: '#E48C75',
                },
                /* Category tokens — brand-aligned */
                learning: '#459492',
                productivity: '#E48C75',
                'well-being': '#5DB786',
                /* State tokens */
                success: '#5DB786',
                warning: '#E48C75',
                info: '#459492',
                /* Surface elevation system */
                surface: {
                    0: 'hsl(var(--surface-0))',
                    1: 'hsl(var(--surface-1))',
                    2: 'hsl(var(--surface-2))',
                    3: 'hsl(var(--surface-3))',
                },
                /* Dark section palette — Revolut-inspired */
                dark: {
                    DEFAULT: '#275255',
                    deep: '#1F3F42',
                    deeper: '#163233',
                    lighter: '#2F6669',
                    muted: 'rgba(255, 255, 255, 0.7)',
                    subtle: 'rgba(255, 255, 255, 0.5)',
                },
            },
            boxShadow: {
                'card': '0 1px 3px rgba(39,82,85,0.06), 0 4px 12px rgba(39,82,85,0.04)',
                'card-hover': '0 4px 12px rgba(39,82,85,0.1), 0 8px 24px rgba(39,82,85,0.06)',
                'card-elevated': '0 8px 30px rgba(39,82,85,0.12), 0 2px 8px rgba(39,82,85,0.08)',
                'premium': '0 4px 20px rgba(39,82,85,0.15), 0 1px 3px rgba(39,82,85,0.1)',
                'inner-highlight': 'inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(39,82,85,0.04), 0 1px 3px rgba(39,82,85,0.06), 0 4px 12px rgba(39,82,85,0.04)',
                'glow-teal': '0 0 30px rgba(69,148,146,0.15)',
                'glow-coral': '0 0 30px rgba(228,140,117,0.15)',
                'dark-card': '0 2px 8px rgba(0,0,0,0.15), 0 8px 30px rgba(0,0,0,0.1)',
                'stat': '0 1px 3px rgba(39,82,85,0.08), 0 6px 20px rgba(39,82,85,0.06)',
                'stat-hover': '0 4px 12px rgba(39,82,85,0.12), 0 12px 36px rgba(39,82,85,0.08)',
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
                'fade-in': {
                    from: { opacity: '0', transform: 'translateY(8px)' },
                    to: { opacity: '1', transform: 'translateY(0)' }
                },
                'slide-in': {
                    from: { transform: 'translateX(-100%)' },
                    to: { transform: 'translateX(0)' }
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(69, 148, 146, 0.2)' },
                    '50%': { boxShadow: '0 0 40px rgba(69, 148, 146, 0.35)' }
                },
                'scale-in': {
                    from: { opacity: '0', transform: 'scale(0.95)' },
                    to: { opacity: '1', transform: 'scale(1)' }
                },
                'slide-up': {
                    from: { opacity: '0', transform: 'translateY(16px)' },
                    to: { opacity: '1', transform: 'translateY(0)' }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-6px)' }
                },
                'shimmer': {
                    from: { backgroundPosition: '-200% 0' },
                    to: { backgroundPosition: '200% 0' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.4s ease-out forwards',
                'slide-in': 'slide-in 0.3s ease-out',
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                'scale-in': 'scale-in 0.2s ease-out',
                'slide-up': 'slide-up 0.4s ease-out forwards',
                'float': 'float 4s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite'
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};
