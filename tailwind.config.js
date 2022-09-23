module.exports = {
  darkMode: 'class',
  content: ['node_modules/daisyui/dist/**/*.js', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['lofi'],
  },
};
