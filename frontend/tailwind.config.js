/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "tertiary-color": "var(--tertiary-color)",
        "quaternary-color": "var(--quaternary-color)",
        "quinary-color": "var(--quinary-color)",
        "background-color": "var(--background-color)",
      },
    },
  },
  plugins: [],
}

