module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "25rem"
      },
      height: {
        sm: "96.5vh",
        xl: "95.6vh"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
