/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/pages/**/*.{js,jsx}"
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
          amber: '#FFCC66'
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'pulse-honey': 'pulse-honey 2s infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(15px, -10px) rotate(5deg)' },
          '50%': { transform: 'translate(-10px, 10px) rotate(-8deg)' },
          '75%': { transform: 'translate(10px, -5px) rotate(3deg)' }
        },
        'slide-up': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        'scale-in': {
          from: { opacity: 0, transform: 'scale(0.9)' },
          to: { opacity: 1, transform: 'scale(1)' }
        },
        'pulse-honey': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 185, 71, 0.7)' },
          '50%': { boxShadow: '0 0 0 15px rgba(255, 185, 71, 0)' }
        }
      },
      screens: {
        'xs': '475px'
      }
    }
  },
  plugins: []
}