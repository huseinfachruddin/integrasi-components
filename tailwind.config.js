/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/plugin";

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    colors: {
      netral: {
        10: "#FFFFFF",
        20: "#F6F6F6",
        30: "#EFEFEF",
        40: "#E3E3E3",
        50: "#C2C2C2",
        60: "#A6A7A6",
        70: "#818281",
        80: "#6F706F",
        90: "#505250",
        100: "#161816",
      },
      primary: {
        DEFAULT: "#3F6AD8",
        light: "#C8D7F9",
        "semi-dark": "#2F4BBE",
        dark: "#1F2E8A",
      },
      danger: {
        DEFAULT: "#F80203",
        light: "#FECCCD",
        "semi-dark": "#CF0203",
        dark: "#7C0102",
      },
      warning: {
        DEFAULT: "#EB8600",
        light: "#FBE7CC",
        "semi-dark": "#C47000",
        dark: "#764300",
      },
      success: {
        DEFAULT: "#16AE26",
        light: "#D0EFD4",
        "semi-dark": "#129120",
        dark: "#0B5713",
      },
      info: {
        DEFAULT: "#0E65D0",
        light: "#CFE0F6",
        "semi-dark": "#0C54AD",
        dark: "#073368",
      },
    },
    fontSize: {
      xs: ["0.625rem", "1rem"], //10px
      s: ["0.75rem", "1.125rem"], //12px
      m: ["0.875rem", "1.375rem"], //14px
      l: ["1rem", "1.5"], //16px
      "heading-s": ["1.25rem", "1.875rem"], //20px
      "heading-m": ["1.75rem", "2.375rem"], //28px
      "heading-l": ["2.25rem", "2.875rem"], //36px
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin"), flowbite],
};
