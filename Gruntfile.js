var k = {
    karmaconf: 'karma.unit.conf.js',
    protractorconf: "protractor.conf.js",
}

module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks); // so you don't have to loadNpmTasks
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['gruntfile.js', 'tutorila/quickstart/static/**/*.js']
        },
        mochaTest: {
          test: {
            options: {
              reporter: 'min', // "spec", "list"
              captureFile: 'tmp/mocha.results.txt', // Optionally capture the reporter output to a file
              quiet: false, // Optionally suppress output to standard out (defaults to false)
              clearRequireCache: true // Optionally clear the require cache before running tests (defaults to false)
            },
            src: [
              'models/**/*.test.js'
            ]
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
            nginx: { // TODO. use for something else. nginx configs and other ones are done in npm
                command: 'conf/nginx/install.sh',
                options: {
                    stdout: true,
                    stderr: true,
                    stdin: true,
                    // async: true,
                }
            }
        },
        watch: {
          js: {
            options: {
              spawn: false,
            },
            files: [
              "Gruntfile.js",
              "models/**/*.js"
            ],
            tasks: [
              'test:mocha',
              // "test:karma"
            ]
          }
        }
    });

    grunt.registerTask('default', ["jshint"]);

    grunt.registerTask('test', function(target) {
        if (target == "mocha"){
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

    grunt.registerTask("nginx", ["shell:nginx"]) // TODO. remove. better to have set up scripts in npm.

};
