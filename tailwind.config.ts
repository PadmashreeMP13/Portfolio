import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0a0a0f",
        surface: "#11111a",
        ink: "#e7e7ee",
        muted: "#8a8aa3",
        magenta: "#ff00e5",
        cyan: "#00fff2",
        acid: "#c6ff00",
        uv: "#8b00ff",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif"],
      },
      animation: {
        "spin-slow": "spin 18s linear infinite",
        "pulse-glow": "pulseGlow 2.4s ease-in-out infinite",
        "scan": "scan 6s linear infinite",
        "gradient-shift": "gradientShift 12s ease infinite",
        "flicker": "flicker 3.2s linear infinite",
        "data-stream": "dataStream 8s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(255,0,229,.5), 0 0 24px rgba(255,0,229,.3)" },
          "50%": { boxShadow: "0 0 0 6px rgba(255,0,229,0), 0 0 36px rgba(255,0,229,.7)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        gradientShift: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        flicker: {
          "0%,19%,21%,23%,25%,54%,56%,100%": { opacity: "1" },
          "20%,24%,55%": { opacity: "0.65" },
        },
        dataStream: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      backgroundImage: {
        "mesh-rave":
          "radial-gradient(at 20% 20%, rgba(255,0,229,.35) 0, transparent 45%), radial-gradient(at 80% 30%, rgba(0,255,242,.25) 0, transparent 45%), radial-gradient(at 50% 80%, rgba(139,0,255,.35) 0, transparent 45%)",
        "gradient-text":
          "linear-gradient(90deg,#ff00e5 0%,#00fff2 35%,#c6ff00 65%,#ff00e5 100%)",
      },
      boxShadow: {
        glow: "0 0 16px rgba(255,0,229,.55), 0 0 32px rgba(255,0,229,.35)",
        "glow-cyan": "0 0 16px rgba(0,255,242,.55), 0 0 32px rgba(0,255,242,.35)",
        "glow-acid": "0 0 16px rgba(198,255,0,.55), 0 0 32px rgba(198,255,0,.35)",
      },
    },
  },
  plugins: [],
};
export default config;
