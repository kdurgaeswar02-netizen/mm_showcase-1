/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",      // White
        text: "#1a202c",           // Dark Slate Gray
        primary: "#192a56",       // Midnight Blue
        secondary: "#f7fafc",       // Lighter Gray
        accent: "#daa520",        // Goldenrod
      },
      fontFamily: {
        sans: ["'Poppins'", "sans-serif"],
        serif: ["'Lora'", "serif"],
        display: ["'Poppins'", "sans-serif"],
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
