/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "orange": "hsl(26, 100%, 55%)",
        "pale-orange": "hsl(25, 100%, 94%)",
        "very-dark-blue": "hsl(220, 13%, 13%)",
        "dark-grayish-blue": "hsl(219, 9%, 45%)",
        "grayish-blue": "hsl(220, 14%, 75%)",
        "light-grayish-blue": "hsl(223, 64%, 98%)",
        "white": "hsl(0, 0%, 100%)",
        "black": "hsl(0, 0%, 0%)",
      },
      fontFamily: {
        "sans": "Kumbh Sans, sans-serif"
      }
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.no-spinner': {
          'input[type=number]::-webkit-outer-spin-button, input[type=number]::-webkit-inner-spin-button': {
            display: 'none',
          },
          'input[type=number]': {
            '-moz-appearance': 'textfield',
          },
        },
      });
    },
  ],
}