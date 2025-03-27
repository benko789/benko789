/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontSize: {
          '20xl': '20rem',
          '30xl': '30rem',
        },
      },
    },
    plugins: [],
  }