/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        abyss: '#07171c',
        deep: '#0b2730',
        reef: '#51d2bd',
        foam: '#f3f0e8',
        sand: '#d9cfbd',
      },
      fontFamily: {
        sans: ['Inter', '"Noto Sans TC"', '"Noto Sans JP"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
