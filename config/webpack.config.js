var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    t2forum: './src/main.ts',
  },
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
    path: './dist',
  },

  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.ts', '.js', '.scss', '.css', '.html']
  },

  module: {
    preLoaders: [
      //{ test: /src.*\.js$/, loader: 'source-map-loader'},
    ],
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader?tsconfig=src/tsconfig.json' },
      { test: /\.s?css$/, loader: 'raw!sass' },
      { test: /\.(ttf|eot|woff2?|png|jpe?g|svg)$/, loader: "url-loader" },
      { test: /\.html$/, loader: 'html'}
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
};
