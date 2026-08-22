import type { Config } from "tailwindcss";

// The design system lives in src/styles/tokens.css. Tailwind is kept for the
// occasional utility; its preflight reset is disabled because base.css owns
// the reset, and its theme reads the same custom properties so the two can
// never drift apart.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        porcelain: "var(--porcelain)",
        paper: "var(--paper)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        indigo: "var(--indigo)",
        coral: "var(--coral)",
        mint: "var(--mint)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        ui: ["var(--font-ui)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
