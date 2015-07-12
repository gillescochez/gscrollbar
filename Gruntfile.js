module.exports = function(grunt) {

    grunt.initConfig({
        uglify: {
            build: {
                src: ["js/gscrollbar.js"],
                dest: "js/gscrollbar.min.js"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("default", "uglify");

};