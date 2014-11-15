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
        karma: {
            unit: {
                configFile: k.karmaconf,
                autoWatch: false,
                singleRun: true
            },
            watch: {
                configFile: k.karmaconf,
                autoWatch: true,
                singleRun: false,
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
    });

    grunt.registerTask('default', ["jshint"]);
    grunt.registerTask('test', ["karma:unit"]);

    grunt.registerTask('test', function(target) {
        if (target === 'unit') {
            return grunt.task.run([
                "karma:unit"
            ]);
        } else if (target === 'e2e') {
            return grunt.task.run([
                "protractor:run"
            ]);
        } else grunt.task.run([
            'test:unit'
        ]);
    });

    grunt.registerTask("watch", ["karma:watch"])
    grunt.registerTask("nginx", ["shell:nginx"]) // TODO. remove. better to have set up scripts in npm.

};
