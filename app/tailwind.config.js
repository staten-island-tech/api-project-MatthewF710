/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./JS/**/*.js",
    "./CSS/**/*.css",
    "./public/**/*.html", //had to fix content cause it was wrong
  ],
  theme: {
    screens: {
      sm: "724px",
      md: "1082px",
      lg: "1290px",
      xl: "1440px",
    },
    colors: {
      // special colors
      blue: "#1fb6ff",
      darkBlue: "#0e4c75",
      purple: "#7e8bef",
      red: "#ff7169",
      pink: "#ff49db",
      CardBG: "#ff7043",
      green: "#13ce66",
      yellow: "#ffeb3b",
      TopbarBG: "#273444",
      MainBG: "#8492a6",
      modernBg: "#f5f5f5",
      TextColor: "#000000",
    },
    fontFamily: {
      // for fonts
      pokeFont: ['"Pokemon Solid"', "sans-serif"],
      pixelFont: ['"PF Tempesta Seven"', "sans-serif"],
    },
  },
  plugins: [require("daisyui")],
};
