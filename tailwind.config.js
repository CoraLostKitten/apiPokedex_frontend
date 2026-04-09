import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui, // <--- Usamos la variable que hemos importado arriba
  ],
  daisyui: {
    themes: ["light"],
  },
};
