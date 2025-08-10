/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      xsxm: "350px",
      ssmm: "410px",
      ssm: "480px",
      sfm: "550px",
      smm: "650px",
      sm: "740px",
      md: "800px",
      mmd: "910px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1555px",
      xxxl: "1700px",
    },
  },
  plugins: [],
};
