import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        manrope: ["var(--font-manrope)"],
        "open-sans": ["var(--font-open-sans)"],
        montserrat: ["var(--font-montserrat)"],
        inter: ["var(--font-inter)"],
        "nunito-sans": ["var(--font-nunito-sans)"],
        "dancing-script": ["var(--font-dancing-script)"],
        "amatic-sc": ["var(--font-amatic-sc)"],
        "dm-serif": ["DM Serif Display", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;