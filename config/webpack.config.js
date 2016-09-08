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
    extensions: [
      '', '.ts', '.js', '.scss', '.css', '.html', '.json', '.yaml',
    ],
  },

  module: {
    preLoaders: [
      //{ test: /src.*\.js$/, loader: 'source-map-loader'},
    ],
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader?tsconfig=src/tsconfig.json' },
      { test: /\.scss$/, loader: 'css-to-string!css!sass' },
      { test: /\.css$/, loader: 'css-to-string!css' },
      { test: /\.(ttf|eot|woff2?|png|jpe?g|svg)$/, loader: "url" },
      { test: /\.html$/, loader: 'html'},
      { test: /\.json$/, loader: 'json'},
      { test: /\.ya?ml$/, loader: 'json!yaml'},
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
};
