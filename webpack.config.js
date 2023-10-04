const path = require('path');

module.exports = {
  entry: './src/app/page.tsx', // Your entry file
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundle filename
  },
  // Other configuration options...
};
