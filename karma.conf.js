const webpackConfig = require('./webpack.test');

module.exports = function (config) {
    config.set({
        basePath: '',
        plugins: [
            require('karma-chrome-launcher'),
            require('karma-spec-reporter'),
            require('karma-jasmine'),
            require('karma-webpack'),
            require('karma-jasmine-html-reporter')
        ],
        frameworks: ['jasmine'],
        files: [
            'src/test.js'
        ],
        exclude: [],
        preprocessors: {
            'src/test.js': ['webpack']
        },
        client: {
            clearContext: false
        },
        reporters: ['kjhtml', 'spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity,
        webpack: {
            ...webpackConfig
        }
    });
};
