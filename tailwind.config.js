/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./views/*.ejs",
     "./views/partials/*.ejs",
     "./views/Page/*.ejs",
     "./views/layouts/*.ejs"
  ],
  theme: {
    extend: {
        height : { 
            full2 : "100vh"
        }
    },
  },
  plugins: [],
}

