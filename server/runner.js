require('babel-register')({
  presets: ['es2015', 'react'],
  plugins: ['transform-object-rest-spread', 'transform-class-properties', 'transform-decorators-legacy']
});
require('./app.js');