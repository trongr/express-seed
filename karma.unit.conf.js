// Karma configuration
// Generated on Thu Oct 30 2014 17:05:39 GMT+0000 (UTC)

module.exports = function(config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        files: [
            "tutorila/static/bower_components/angular/angular.js",
            'tutorila/static/bower_components/angular-route/angular-route.js',
            'tutorila/static/bower_components/angular-mocks/angular-mocks.js',
            "tutorila/quickstart/static/index.js",
            "tutorila/quickstart/static/main/main.js",
            "tutorila/quickstart/static/main/main.factory.js",
            'tutorila/test/unit/**/*.spec.js',
        ],
        exclude: [],
        preprocessors: {},
        reporters: ['progress'],
        port: 6789,
        colors: true,
        logLevel: config.LOG_INFO, // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_DEBUG
        autoWatch: false,
        singleRun: true,
        browsers: ["PhantomJS"],
    });

};
