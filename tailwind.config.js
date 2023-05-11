/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        "weather-primary":"#2a38b4",
        "weather-secondary":"#1485cb",
      }
    },
    fontFamily:{
      Montserrat:["Montserrat, sans-serif"],
    },
    container:{
      padding:"2rem",
      center:true,
    },
    screens:{
      sm:"640px",
      md:"768px",
    }
  },
  plugins: [],
};

