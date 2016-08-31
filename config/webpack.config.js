var path = require('path');

module.exports = {
  entry: {
    t2forums: './src/main.ts',
  },
  output: {
    filename: '[name].bundle.js',
    path: './dist',
  },

  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.ts', '.js', '.scss', '.css', '.html']
  },

  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader?tsconfig=src/tsconfig.json' },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(ttf|eot|woff2?|png|jpe?g|svg)$/, loader: "url-loader" },
      { test: /\.html/, loader: 'html'}
    ]
  },
};
