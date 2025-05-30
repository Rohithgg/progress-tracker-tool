/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '475px', // Extra small screen breakpoint
      },
      spacing: {
        '0.75': '0.1875rem', // 3px
        '1.25': '0.3125rem', // 5px
      },
      fontSize: {
        'xxs': '0.625rem', // 10px
        'xs': '0.75rem',   // 12px
        'sm': '0.875rem',  // 14px
        'base': '1rem',    // 16px
        'lg': '1.125rem',  // 18px
      },
      borderWidth: {
        '3': '3px',
        '6': '6px',
      },
      maxHeight: {
        '112': '28rem', // 448px
        '128': '32rem', // 512px
      },
    },
  },
  plugins: [],
};
