/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazone_blue: {
          light: "#232f3e",
          DEFAULT: "#131921",
        },
      },
    },
  },
  darkMode: false,
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
