let webpack = require('webpack');
module.exports = require('./config/webpack.config.js');

module.exports.output.filename = '[name]-beta.bundle.js';
module.exports.devtool = 'source-map';
module.exports.plugins = (module.exports.plugins ? module.exports.plugins: [])
module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
  mangle: false,
  sourceMap: true,
}))
