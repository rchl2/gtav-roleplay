var tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    // ...
    tailwindcss('./path/to/your/tailwind.js'),
    require('autoprefixer')
    // ...
  ]
};
