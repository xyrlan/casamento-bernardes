import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        noite: "rgb(var(--c-noite) / <alpha-value>)",
        "noite-alta": "rgb(var(--c-noite-alta) / <alpha-value>)",
        creme: "rgb(var(--c-creme) / <alpha-value>)",
        "creme-suave": "rgb(var(--c-creme-suave) / <alpha-value>)",
        rosa: "rgb(var(--c-rosa) / <alpha-value>)",
        luz: "rgb(var(--c-luz) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        texto: ["var(--font-texto)", "Georgia", "serif"],
        script: ["var(--font-script)", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
