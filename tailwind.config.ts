import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { ink: "#11110f", ivory: "#f6f3ec", gold: "#a78349" },
      fontFamily: { sans: ["var(--font-manrope)", "sans-serif"], serif: ["var(--font-cormorant)", "serif"] },
    },
  },
  plugins: [],
};

export default config;
