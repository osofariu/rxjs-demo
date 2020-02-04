const webpackConfig = require('./webpack.test');

module.exports = function (config) {
  config.set({
    basePath: '',
    plugins: [
      require('karma-chrome-launcher'),
      require('karma-spec-reporter'),
      require('karma-jasmine'),
      require('karma-webpack'),
    ],
    frameworks: ['jasmine'],
    files: [
      'src/test.js'
    ],
    exclude: [],
    preprocessors: {
      'src/test.js': [ 'webpack']
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity,
    webpack: {
      ...webpackConfig
    }
  });
};
