var _ = require("lodash")

var k = {
    karmaconf: 'karma.unit.conf.js',
    protractorconf: "protractor.conf.js",
    clientfiles: [],
    serverfiles: [
      "conf.js",
      "app.js",
      "bin/www",
      "models/**/*.js",
      "api/**/*.js",
    ],
    testfiles: [
      'models/**/*.test.js',
      "api/**/*.test.js",
    ]
}

module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks); // so you don't have to loadNpmTasks
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: _.union(k.serverfiles, k.clientfiles)
        },
        mochaTest: {
          test: {
            options: {
              timeout: 2000,
              reporter: 'list', // "spec", "list", "min"
              captureFile: 'tmp/mocha.results.txt', // Optionally capture the reporter output to a file
              quiet: false, // Optionally suppress output to standard out (defaults to false)
              clearRequireCache: true // Optionally clear the require cache before running tests (defaults to false)
            },
            src: k.testfiles
          },
        },
        karma: {
            unit: {
                configFile: k.karmaconf,
                autoWatch: false,
                singleRun: true
            }
        },
        protractor: {
            options: {
                keepAlive: true,
                configFile: k.protractorconf,
            },
            run: {}
        },
        shell: {
            node: { // TODO. use this for something else
                command: 'DEBUG=express101 PORT=8080 node ./bin/www',
                options: {
                    stdout: true,
                    stderr: true,
                    stdin: true,
                    // async: true,
                }
            }
        },
        watch: {
          test: {
            options: {
              spawn: false,
            },
            files: _.union(k.serverfiles, "Gruntfile.js"),
            tasks: [
              'test:mocha',
              // "test:karma"
              // "jshint", // let's not bother with jshint for now. lots of false positives
            ]
          },
        },
    });

    grunt.registerTask('default', ["test"]);

    grunt.registerTask('test', function(target) {
        if (target === "mocha"){
          return grunt.task.run(["mochaTest"])
        } else if (target === 'karma') {
            return grunt.task.run([
                "karma:unit"
            ]);
        } else if (target === 'e2e') {
            return grunt.task.run([
                "protractor:run"
            ]);
        } else grunt.task.run([ // run everything
            'test:mocha',
            "test:unit",
            "test:e2e"
        ]);
    });

};
