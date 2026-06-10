import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Planes palette, exact hex from the brand deck
        ink: {
          DEFAULT: "#1e1e1e",
          soft: "#3a3a3a",
          muted: "#6b6b6b",
        },
        cream: {
          DEFAULT: "#f4f3f1",
          deep: "#eceae6",
          edge: "#dedbd5",
        },
        white: "#ffffff",
        sky: {
          DEFAULT: "#afedff",
          deep: "#7fdcf6",
        },
        butter: {
          DEFAULT: "#ffe787",
          deep: "#f6d65a",
        },
        coral: {
          DEFAULT: "#ff7780",
          deep: "#ef5b66",
        },
        mint: {
          DEFAULT: "#a7ffd0",
          deep: "#73edb0",
        },
        // bays
        "bay-product": "#afedff",
        "bay-design": "#ff7780",
        "bay-dev": "#a7ffd0",
        "bay-new-business": "#ffe787",
        "bay-general": "#eceae6",
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
