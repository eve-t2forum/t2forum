module.exports = require('./config/webpack.config.js');

module.exports.devtool = 'inline-source-map';
module.exports.output.filename = '[name]-dev.bundle.js';
