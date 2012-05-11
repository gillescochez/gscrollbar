module.exports = function(grunt) {

  grunt.initConfig({
    min: {
      dist: {
        src: 'js/gscrollbar.js',
        dest: 'js/gscrollbar.min.js'
      }
    }
  });

  grunt.registerTask('default', 'min');
};
