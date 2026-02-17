import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#F3D9B9",   // BG 1
          secondary: "#FAF2E8", // BG 2
        },

        surface: {
          DEFAULT: "#E8C8A8",   // Surface
        },

        border: {
          DEFAULT: "#C8A98D",
        },

        text: {
          primary: "#3A3128",   // Text 1
          secondary: "#6E5C4E", // Text 2
          muted: "#9A8575",
          dark: "#4A3F35",      // Dark Neutral
        },

        accent: {
          primary: "#2F3E46",   // Accent 1
          secondary: "#C47A5A", // Accent 2
        },

        highlight: {
          DEFAULT: "#8FA9B3",
        },
      },
    },
  },
  plugins: [],
}

export default config