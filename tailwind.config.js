module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: "poppins",
    },
    screens: {
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "640px" },
      "2sm": { max: "425px" },
    },
    extend: {
      backgroundColor: {
        prim: "#ffffff",
        sec: "#1c9bf0",
        hov: "#1785ce",
        hovLight: "#e6f3fd",
      },
      backgroundImage: (theme) => ({
        "twitter-bg": "url('/src/assets/twitterBackground.png')",
      }),
      textColor: {
        prim: "#0f1419",
        sec: "#536471",
        twit: "#1c9bf0",
      },
      borderColor: {
        twit: "#1c9bf0",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "1280px",
          padding: "0 16px",
          margin: "0 auto",
        },
      });
    },
  ],
};
