/* eslint-env es6 */
const colors = require('tailwindcss/colors');

console.log(colors.white);

module.exports = {
  content: ['./src/**/*.{html,ts,css,scss}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        mars: "url('assets/img/mars2_reduced.jpg')",
        'earth-horizon': "url('assets/img/earth_horizon.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
