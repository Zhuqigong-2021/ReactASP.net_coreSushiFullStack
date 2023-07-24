/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito"], // ! find out why this fontFamily still not register to the styles.css inside the public -o output folder.
      },
    },
  },
  plugins: [],
};
