/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        'xs':'375px',
        'sm': '640px',
  
        'md': '768px',

  
        'lg': '1024px',
  
  
        'xl': '1280px',
  
  
        '2xl': '1536px',
    
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    colors:{
      "pinkpastel":"#F5E6DB",
      "gray":"#171717",
      "blue":"#87CEEB",
      "lightgreen":"#EEF6F0",
      // "lightpink":"#F5E6DB"
      "lightyellow":"#FFFAD1",
      "warning":"#F08080",
      "darkwhite":"#FFFFFF80"
      
      
    }
  },
  plugins: [require("tailwindcss-animate")],
}