import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#0B0F14", // Main app background (near-black blue)
          secondary: "#111827", // Slightly lifted section background
        },

        surface: {
          DEFAULT: "#161E2A", // Card / panel surface
          elevated: "#1C2533", // Hovered / layered surface
        },

        border: {
          DEFAULT: "#243041", // Subtle container border
          subtle: "#1B2430", // Divider lines
        },

        text: {
          primary: "#E6EDF3", // Main readable text
          secondary: "#9FB3C8", // Subtext / metadata
          muted: "#6B7C93", // Muted labels
          inverted: "#0B0F14", // For bright buttons
        },

        accent: {
          primary: "#00BFFF", // Neon blue (controlled use)
          hover: "#1AC8FF", // Slightly brighter hover
          glow: "#0094FF", // For subtle glow/shadow usage
        },

        highlight: {
          DEFAULT: "#132238", // Selection or background emphasis
        },
      },
    },
  },
  plugins: [],
};

export default config;
