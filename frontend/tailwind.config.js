/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./src/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        funnel: ["FunnelSans", "sans-serif"],
        cookie: ["Cookie", "sans-serif"],
      },
    },
  },
  plugins: [],
};
