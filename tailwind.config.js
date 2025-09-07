import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#4F46E5', // A nice indigo
        'brand-secondary': '#EC4899', // A vibrant pink for accents
        'brand-light': '#F0F2F5', // A light gray for backgrounds
        'brand-dark': '#111827', // A dark gray for text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    aspectRatio,
  ],
}

export default config