/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        honey: {
          primary: '#FFB947',
          dark: '#E69500',
          light: '#FFEACC',
          cream: '#FFF8E7',
          brown: '#8B6914',
          amber: '#FFCC66',
        },
      },
      animation: {
        'pulse-honey': 'pulse-honey 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        'pulse-honey': {
          '0%, 100%': { 
            boxShadow: '0 0 0 0 rgba(255, 185, 71, 0.7)' 
          },
          '50%': { 
            boxShadow: '0 0 0 15px rgba(255, 185, 71, 0)' 
          },
        },
      },
      backgroundImage: {
        'honeycomb-pattern': 'linear-gradient(30deg, #FFEACC 12%, transparent 12.5%, transparent 87%, #FFEACC 87.5%, #FFEACC), linear-gradient(150deg, #FFEACC 12%, transparent 12.5%, transparent 87%, #FFEACC 87.5%, #FFEACC)',
      },
    },
  },
  plugins: [],
};