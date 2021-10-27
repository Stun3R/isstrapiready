const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  darkMode: "class",
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    fontFamily: {
      body: ["Poppins"],
    },
    colors: {
      ...colors,
      gray: {
        50: "#f4f4f9",
        100: "#e8e8f3",
        200: "#c7c6e0",
        300: "#a5a4ce",
        400: "#615fa9",
        500: "#1d1b84",
        600: "#1a1877",
        700: "#161463",
        800: "#11104f",
        900: "#0e0d41",
      },
      orange: colors.orange,
      strapi: {
        purple: {
          light: "#A06AFF",
          DEFAULT: "#9A4BFF",
          dark: "#773AE7",
        },
        green: {
          light: "#1BC77A",
          DEFAULT: "#11A865",
          dark: "#0E8D55",
        },
        blue: {
          light: "#1DBACA",
          DEFAULT: "#00A9BA",
          dark: "#127F8A",
        },
      },
    },
  },
  plugins: [],
};
