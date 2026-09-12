/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: '#fff8ec',
        foam: '#ffffff',
        shore: '#e6f6f2',
        lagoon: '#2cc5b4',
        coral: '#ff7657',
        ink: '#12394a',
        deep: '#0e3446',
      },
      fontFamily: {
        sans: ['"PingFang TC"', '"Hiragino Sans"', '"Noto Sans TC"', '"Noto Sans JP"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
