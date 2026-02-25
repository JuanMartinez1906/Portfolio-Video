import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["var(--font-bebas)", "Impact", "sans-serif"],
        grotesk: ["var(--font-grotesk)", "system-ui", "sans-serif"],
      },
      colors: {
        bg: "#0d0d0d",
        surface: "#161616",
        "surface-2": "#1f1f1f",
        divider: "#2a2a2a",
        accent: "#e63946",
        "accent-hover": "#ff4d5a",
        muted: "#a0a0a0",
        "muted-2": "#6b6b6b",
      },
      animation: {
        grain: "grain 8s steps(10) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
