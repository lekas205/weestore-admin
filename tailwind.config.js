/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./pages/**/*.{ts,tsx,vue}",
    "./components/**/*.{ts,tsx,vue}",
    "./app/**/*.{ts,tsx,vue}",
    "./src/**/*.{ts,tsx,vue}",
  ],
  prefix: "tw-",
  theme: {
    extend: {
      colors: {
        primary: "#FE0000",
        blue: "#06177A",
        orange: "#F65901",
        green: "#0CAE13",
        lime: "#CFBB03",
        wine: "#AE0C0C",
        brown: "#AE6D0C",
        "purple-200": "#AE0C6D",
        "blue-200": "#0C6AAE",
        "green-200": "#0CAEA5",
      },
    },
  },
  plugins: [],
};
