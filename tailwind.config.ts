import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'kaotika': ['kaotika', 'serif'],
      },
      colors: {
        medievalGold: '#DAA520',
        medievalRed: '#8B0000',
        medievalBlue: '#000080',
        medievalGray: '#2F4F4F',
        medievalSepia: '#cda882',
        darkSepia: '#87634A',
        blackSepia: '#513B2C',
        grey: '#292524',
      },
      borderColor: {
        sepia: '#cda882'
      },
      scrollbar: {
        width: "10px",
        track: {
          backgroundColor: "#2F4F4F",
        },
        thumb: {
          backgroundColor: "#DAA520",
          borderRadius: "5px",
          hover: {
            backgroundColor: "#FFD700",
          },
        },
      },
      keyframes: {
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(8%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
        animation: {
          slideInFromRight: 'slideInFromRight 0.5s ease-out',
          fadeIn: 'fadeIn 0.5s ease-out',
          slideIn: 'slideIn 0.5s ease-out',
        },
      },
    },
    plugins: [
      nextui(),
      require('tailwind-scrollbar')({ nocompatible: true })
    ],
  };

  export default config;