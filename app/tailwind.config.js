/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Ensure this is included
    "./JS/**/*.js", // Ensure JS files are included
    "./CSS/**/*.css", // If there are other CSS files
    "./public/**/*.html", // If there are dynamic HTML files
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      blue: "#1fb6ff",
      darkBlue: "#0e4c75",
      purple: "#7e5bef",
      pink: "#ff49db",
      CardBG: "#ff7043",
      green: "#13ce66",
      yellow: "#ffeb3b",
      TopbarBG: "#273444",
      MainBG: "#8492a6",
      modernBg: "#f5f5f5",
      TextColor: "#000000",
    },
  },
  plugins: [require("daisyui")],
};
