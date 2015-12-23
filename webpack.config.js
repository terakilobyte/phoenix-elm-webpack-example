const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    'app': [
      './web/static/css/app.scss',
      './web/static/js/app.js',
      './web/elm/Main.elm'
    ]
  },
  output: {
    path: './priv/static',
    filename: '/js/app.js'
  },
  resolve: {
    moduleDirectories: [
      __dirname + '/web/static/js'
    ],
    extensions: ['', '.js', '.elm'],
    alias: {
      phoenix: __dirname + '/deps/phoenix/web/static/js/phoenix.js',
      coffee: __dirname + '/web/elm'
    }
  },
  module: {
    loaders: [{
      test: /\.jsx?$/, // in case we want to use React elsewhere later
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.elm$/,
      exclude: [/elm-stuff/, /node_modules/],
      loader: 'elm-webpack'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css!sass?includePaths[]=' + __dirname + '/node_modules'
      )
    }, {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'
    }],
    noParse: [/\.elm$/]
  },
  plugins: [
    new ExtractTextPlugin('css/app.css'),
    new CopyWebpackPlugin([
      { from: './web/static/assets'},
      { from: './deps/phoenix_html/web/static/js/phoenix_html.js',
        to: 'js/phoenix_html.js'
      }
    ])
  ]
};
