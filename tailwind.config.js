/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lv: {
          black: '#19110b',
          gray: '#767676',
          'light-gray': '#e1e1e1',
          orange: '#d6852a',
        },
        luxury: {
          gold: '#D4AF37',
          dark: '#19110b',
          cream: '#F5F5DC',
          brown: '#8B4513',
        },
      },
      fontFamily: {
        sans: ['LouisVuitton', 'Georgia', 'serif'],
        lv: ['LouisVuitton-Regular', 'serif'],
        'lv-demi': ['LouisVuitton-Demi', 'serif'],
        lvoblique: ['LouisVuitton-Oblique', 'serif'],
      },
      transitionTimingFunction: {
        'lv': 'cubic-bezier(0.39, 0.575, 0.565, 1)',
      },
      spacing: {
        'header': 'var(--header-height)',
      },
    },
  },
  plugins: [],
}

