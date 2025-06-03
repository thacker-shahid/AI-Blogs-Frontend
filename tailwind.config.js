/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color: {
        dark: '#000000',
        light: "#F7F8F9",
        // bgPrimary: "#F7F8F9",
        // primary: "#222222",
        // accent: "#24495E"
      }
    },
  },
  plugins: [],
}

