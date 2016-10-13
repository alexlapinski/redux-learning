var ExtrctTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loaders: ['babel']
      }
    ]
  },
  output: {
    filename:'[name].js'
  }
};
