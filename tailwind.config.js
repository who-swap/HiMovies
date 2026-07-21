/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Cinema-at-night palette
        ink: '#0A0A0D',        // page background, near-black
        surface: '#15151B',    // card / row surface
        surface2: '#1D1D25',   // hover surface
        marquee: '#E8B34C',    // warm gold accent (marquee bulb)
        marquee2: '#F4CD7C',   // lighter gold for gradients
        crimson: '#C4483B',    // velvet curtain red - live/badges
        mist: '#9A9AAA',       // muted secondary text
        paper: '#F2F1ED',      // primary light text
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Oswald', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'film-grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: '0 0 24px 0 rgba(232,179,76,0.25)',
      },
    },
  },
  plugins: [],
}
