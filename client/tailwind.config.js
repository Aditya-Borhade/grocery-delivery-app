/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // adjust based on your file extensions and folder structure
  ],
  theme: {
    extend: {
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 0px rgba(129, 140, 248, 0.2)' },
          '50%': { boxShadow: '0 0 15px 5px rgba(129, 140, 248, 0.4)' },
          '100%': { boxShadow: '0 0 0px rgba(129, 140, 248, 0.2)' },
        },
      },
      animation: {
        glow: 'glow 0.8s ease-out',
      },
    },
  },
  plugins: [],
};
