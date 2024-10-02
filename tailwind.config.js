/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color: {
        bgPrimary: "#F7F8F9",
        primary: "#222222",
        accent: "#24495E"
      }
    },
  },
  plugins: [],
}

