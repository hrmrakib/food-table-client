/** @type {import('tailwindcss').Config} */
export default {
  // content: ["./pages/**/*.{html,js}", "./components/**/*.{html,js}"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
