/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'glass': {
          light: 'rgba(255, 255, 255, 0.05)',
          medium: 'rgba(255, 255, 255, 0.08)',
          dark: 'rgba(0, 0, 0, 0.1)',
        }
      },
      opacity: {
        '8': '0.08',
        '15': '0.15',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': {
            boxShadow: '0 0 10px rgba(147, 197, 253, 0.5), 0 0 20px rgba(147, 197, 253, 0.3)'
          },
          'to': {
            boxShadow: '0 0 20px rgba(147, 197, 253, 0.8), 0 0 30px rgba(147, 197, 253, 0.5)'
          },
        }
      }
    },
  },
  plugins: [],
}
