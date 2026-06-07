import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Planes palette, pulled from the brand deck
        ink: {
          DEFAULT: "#141414",
          soft: "#2a2a2a",
          muted: "#5e5b54",
        },
        cream: {
          DEFAULT: "#f4f1e9",
          deep: "#ece7d8",
          edge: "#d9d3c1",
        },
        sky: {
          DEFAULT: "#b7e3f4",
          deep: "#8fcfe7",
        },
        butter: {
          DEFAULT: "#f7e48f",
          deep: "#e7cf63",
        },
        coral: {
          DEFAULT: "#f26a6a",
          deep: "#d44a4a",
        },
        mint: {
          DEFAULT: "#97e2bb",
          deep: "#62c594",
        },
        // bays
        "bay-product": "#b7e3f4",
        "bay-design": "#f26a6a",
        "bay-dev": "#97e2bb",
        "bay-new-business": "#f7e48f",
        "bay-general": "#ece7d8",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      fontSize: {
        // editorial display sizes
        "display-sm": ["2.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["3.75rem", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
        "display-lg": ["5.5rem", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
      },
      maxWidth: {
        page: "84rem",
        prose: "44rem",
      },
      boxShadow: {
        paper: "8px 8px 0 0 rgba(20,20,20,1)",
        "paper-sm": "4px 4px 0 0 rgba(20,20,20,1)",
        soft: "0 1px 0 rgba(20,20,20,0.06), 0 12px 32px -16px rgba(20,20,20,0.18)",
      },
      transitionTimingFunction: {
        glide: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
