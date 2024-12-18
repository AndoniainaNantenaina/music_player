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
        // Personal
        m_lightblue: "#B1F0F7",
        m_normalblue: "#81BFDA",
        m_lightyellow: "#F5F0CD",
        m_normalyellow: "#FADA7A",

        // Neon
        neon_slateyellow: "#FFF7D1",
        neon_purple1: "#8B5DFF",
        neon_purple2: "#6A42C2",
        neon_purple3: "#563A9C",

        // Space
        space_darkblue: "#091057",
        space_blue: "#024CAA",
        space_orange: "#EC8305",
        space_slate: "#DBD3D3",
      },
    },
  },
  plugins: [],
};
