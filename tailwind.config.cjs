/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          100: "#1a1a1a",
          200: "#282828",
          300: "#313131",
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
