var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: "./client/app.js",
  plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production"),
          BROWSER: JSON.stringify(true)
        }
      })
  ],
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
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
}