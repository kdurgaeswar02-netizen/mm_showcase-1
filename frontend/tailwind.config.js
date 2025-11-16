/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1A1A1A", // Deep Charcoal
        text: "#B3B3B3",       // Metallic Silver
        primary: "#007BFF",    // Electric Blue
        secondary: "#E0E0E0",    // Light Grey
        accent: "#FF4500",     // Keeping the old accent for now, can be changed.
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Satoshi", "serif"],
        display: ["Urbanist", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideIn: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
