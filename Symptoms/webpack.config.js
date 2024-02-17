var webpack = require('webpack');

module.exports = {
  entry: {
    nhsuk: [
      './assets/javascripts/vendor/polyfills/details.polyfill.js',
      './assets/javascripts/nhsuk.js',
    ],
    picturefill: ['picturefill'],
    ie: ['JSON2', 'html5shiv'],
  },

  output: {
    path: './build/assets/javascripts/',
    filename: '[name].bundle.js',
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|components|vendor)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
      {
        include: /\.json$/,
        loaders: ['json-loader'],
      },
    ],
  },

  resolve: {
    modulesDirectories: [
      'node_modules',
    ],
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
  ],
};