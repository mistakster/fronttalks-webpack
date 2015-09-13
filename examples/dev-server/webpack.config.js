var HtmlWebpackPlugin =
  require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/index.js'
  },
  output: {
    path: './public',
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [{
      test: /\.(png|jpg|svg)$/,
      loader: 'file'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }, {
      test: /\.jade$/,
      loader: 'jade'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin('index.html')
  ],
  devServer: {
    contentBase: "./public",
    noInfo: true
  }
};
