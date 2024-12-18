/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./src/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        funnel: ["FunnelSans", "sans-serif"],
        cookie: ["Cookie", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        m_lightblue: "#B1F0F7",
        m_normalblue: "#81BFDA",
        m_lightyellow: "#F5F0CD",
        m_normalyellow: "#FADA7A",
      },
    },
  },
  plugins: [],
};
