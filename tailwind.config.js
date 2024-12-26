// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/*.{js,jsx,ts,tsx}',
    './src/components/*.{js,jsx,ts,tsx}',
    './src/Screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        user: '#06A77D',
        company: '#6D38C3',
        seller: '#FE830C',
        hotel: '#FE830C',
        primary: '#6D38C3',
        black: '#131523',
        secondary: '#f7fbfe',
        tertiary: '#FE830C',
        greyFour: '#F3F2f7',
      },
      fontFamily: {
        plight: ['Poppins-Light', 'sans-serif'],
        psemibold: ['Poppins-Semibold', 'sans-serif'],
        pregular: ['Poppins-Regular', 'sans-serif'],
        pmedium: ['Poppins-Medium', 'sans-serif'],
        kregular: ['Kanit-Regular', 'sans-serif'],
        kmedium: ['Kanit-Medium', 'sans-serif'],
      },
      fontSize: {
        header: '24px', 
      },
      fontWeight: {
        header: '600', 
      },
    },
  },
  plugins: [],
};