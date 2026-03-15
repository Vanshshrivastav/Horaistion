/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange:         '#F47521',
          'orange-dark':  '#C85E0F',
          'orange-light': '#FF9A4D',
        },
        dark: {
          900: '#0A0A0F',    // Page background
          800: '#12121A',    // Card background
          700: '#1A1A28',    // Elevated surfaces
          600: '#252535',    // Borders, inputs
          500: '#3A3A55',    // Muted elements
        },
        text: {
          primary:   '#F0F0F5',
          secondary: '#A0A0B8',
          muted:     '#606078',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
      },
      aspectRatio: {
        'poster': '2 / 3',
      },
    },
  },
  plugins: [],
}
