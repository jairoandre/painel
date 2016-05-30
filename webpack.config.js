var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: "./client/app.js",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'react-hot!babel',
        exclude: /node_modules/
      },
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    proxy: {
      '*': 'http://localhost:' + (process.env.PORT || 3000)
    },
    host: 'localhost'
  }
}