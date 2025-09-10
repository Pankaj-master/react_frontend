// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ayurveda: {
          green: {
            light: '#8BAC78',
            DEFAULT: '#4A7C59',
            dark: '#3D6149',
          },
          beige: {
            light: '#F5F0E6',
            DEFAULT: '#D8C4A8',
            dark: '#C0AA87',
          },
          brown: {
            light: '#A97C50',
            DEFAULT: '#8B5A3C',
            dark: '#6D4730',
          },
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}