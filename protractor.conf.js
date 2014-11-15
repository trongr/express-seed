exports.config = {
    //     seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['tutorila/test/e2e/**/*.spec.js'],
    baseUrl: 'http://localhost:8000',
    // holy smokes. this is the one you want to use, not the one that
    // comes with protractor:
    chromeDriver: "node_modules/chromedriver/bin/chromedriver",
    multiCapabilities: [
        {'browserName': 'firefox'},
        {'browserName': 'phantomjs'},
        {browserName: "chrome"}
    ],
    rootElement: 'body', // change if ng-app isn't in body
    // The timeout for each script run on the browser. This should be longer
    // than the maximum time your application needs to stabilize between tasks.
    allScriptsTimeout: 60000,
    getPageTimeout: 60000,
    jasmineNodeOpts: {
        onComplete: function() {},
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 60000
    },
    onPrepare: function(){
        // TODO DEBUG (might not work). uncomment if you get this
        // error: Error while waiting for Protractor to sync with the
        // page:
        // browser.driver.manage().window().setSize(1600, 800);
    },
}
