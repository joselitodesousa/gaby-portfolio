/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Warm Color Palette - Primary Colors
        warm: {
          50: '#fffbf5',
          100: '#fff5f1',
          200: '#ffe8dc',
          300: '#ffd9c6',
          400: '#ffb399',
          500: '#ff9a56',
          600: '#ff8533',
          700: '#e6691f',
          800: '#cc5218',
          900: '#b34510',
          950: '#6b2609',
        },
        // Sandy Brown - Secondary Colors
        sand: {
          50: '#fffbf8',
          100: '#fff5f0',
          200: '#ffe8dc',
          300: '#ffd9c6',
          400: '#f4a460',
          500: '#e8944f',
          600: '#d98040',
          700: '#c2652d',
          800: '#a8541e',
          900: '#914813',
          950: '#5a2d0a',
        },
        // Warm Red - Accent Colors
        terra: {
          50: '#fef9f7',
          100: '#fce8e3',
          200: '#f7d4c8',
          300: '#f0b5a0',
          400: '#e8734f',
          500: '#d94f3c',
          600: '#c83d2a',
          700: '#a43522',
          800: '#862e1c',
          900: '#6b2518',
          950: '#450f08',
        },
        // Earth Tones
        earth: {
          50: '#fefbf8',
          100: '#fdf3ed',
          200: '#f9e8de',
          300: '#f5dcd0',
          400: '#d4845a',
          500: '#c96c41',
          600: '#b35a33',
          700: '#984b29',
          800: '#7a3d21',
          900: '#62321a',
          950: '#3d1d0e',
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '36': '9rem',
        '44': '11rem',
        '52': '13rem',
        '60': '15rem',
        '68': '17rem',
        '76': '19rem',
        '84': '21rem',
        '92': '23rem',
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        base: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'warm': '0 10px 30px -5px rgba(255, 154, 86, 0.2)',
        'warm-lg': '0 20px 40px -10px rgba(255, 154, 86, 0.3)',
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #ff9a56 0%, #f4a460 100%)',
        'gradient-warm-dark': 'linear-gradient(135deg, #ff8533 0%, #e8734f 100%)',
        'gradient-warm-light': 'linear-gradient(135deg, #ffe8dc 0%, #fff5f1 100%)',
        'gradient-warm-sunset': 'linear-gradient(135deg, #d94f3c 0%, #ff9a56 50%, #f4a460 100%)',
        'gradient-warm-earth': 'linear-gradient(135deg, #d4845a 0%, #ff9a56 100%)',
      },
      transition: {
        'smooth': 'all 0.3s ease',
        'smooth-fast': 'all 0.15s ease',
        'smooth-slow': 'all 0.5s ease',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 4s ease-in-out infinite',
        'pulse-warm': 'pulse-warm 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        'float-slow': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-30px)',
          },
        },
        'pulse-warm': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '.7',
          },
        },
        glow: {
          '0%, 100%': {
            'box-shadow': '0 0 20px rgba(255, 154, 86, 0.5)',
          },
          '50%': {
            'box-shadow': '0 0 30px rgba(255, 154, 86, 0.8)',
          },
        },
      },
    },
  },
  plugins: [],
};
