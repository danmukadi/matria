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
        "playfair-display": ["var(--font-playfair-display)"],
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        borderFlow: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        slowPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};

export default config;