const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = function (env) {
  return {
    devtool: 'inline-source-map',
    mode: getMode(env),
    entry: getEntry(env),
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      sourceMapFilename: '[file].map'
    },
    resolve: {
      extensions: ['.js']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        inject: 'body'
      })
    ]
  };
};

function getEntry(env) {
  if (isTest(env))
    return undefined;

  return {
    main: path.resolve(__dirname, 'src', 'main.js'),
  }
}

function getMode(env) {
  return env === 'prod'
    ? 'production'
    : 'development';
}

function isTest(env) {
  return env === 'test';
}
