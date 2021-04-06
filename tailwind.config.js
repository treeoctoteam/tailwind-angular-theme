module.exports = {
  prefix: "",
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./src/**/*.{html,ts}"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    minHeight: {
      10: "10px",
      20: "20px",
      30: "30px",
    },
    extend: {
      colors: {
        primary: "#60A5FA",
        success: "#34D399",
        info: "#9CA3AF",
        warning: "#FBBF24",
        danger: "#F87171",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
