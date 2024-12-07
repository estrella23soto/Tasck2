/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,ts}"],
  theme: {
      extend: {
        colors: {
          rose: {
            light: '#ff0080',
            DEFAULT: '#ff0080',
            dark: '#ff0080',
          },
          purple: {
            light: '#E0BBE4',
            DEFAULT: '#9370DB',
            dark: '#663399',
          },
        },
      },
    },
  plugins: [],
}
