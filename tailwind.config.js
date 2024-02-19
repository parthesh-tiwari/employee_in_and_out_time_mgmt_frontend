/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        default: ["Poppins", "sans-serif"],
      },

      colors: {
        primary: "#250f8d",
        "primary-accent": "#3C4CAC",
        secondary: "#e8a49c",
        "pink-shade": "#F04393",
        "yellow-shade": "#FBC34A",
      },
    },
  },
  plugins: [],
};

