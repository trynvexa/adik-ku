/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-pink': '#F8C8DC',
        'pastel-pink': '#FADADD',
        'magenta': '#D63384',
        'deep-magenta': '#A41363',
        'dark-purple': '#2D0B2E',
        'cream': '#FFF7F0',
        'soft-purple': '#E8D9F5',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        dancing: ['"Dancing Script"', 'cursive'],
      },
      boxShadow: {
        'glow-pink': '0 0 25px rgba(214, 51, 132, 0.45)',
        'glow-gold': '0 0 20px rgba(255, 215, 0, 0.4)',
        'scrapbook': '0 10px 30px -5px rgba(45, 11, 46, 0.25)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
