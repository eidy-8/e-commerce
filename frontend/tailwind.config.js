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
        "gray-color": "var(--gray-color)",
        "error-color": "var(--error-color)",
        "background-color": "var(--background-color)",
        "background-darker-color": "var(--background-darker-color)",
        "primary-button-color": "var(--primary-button-color)",
        "secondary-button-color": "var(--secondary-button-color)",
        "tertiary-button-color": "var(--tertiary-button-color)"
      },
    },
  },
  plugins: [],
}

