/*
 * grunt-ngcom
 * https://github.com/bondli/grunt-ngcom
 *
 * Copyright (c) 2015 bondli
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var comConfig = {
    filters: require('./component.json').components || [],
    dependencies: require('./component.json').dependencies || [],
    source: 'bower_components/star-ui/app',
    dist: 'bower_components/star-ui/build'
  };

  // Project configuration.
  grunt.initConfig({
    
    comConfig : comConfig,

    // Configuration to be run (and then tested).
    ngcom: {
      options: {
        'target': '<%= comConfig.dist %>',
        'dependencies': comConfig.dependencies,
        'filters': comConfig.filters
      },
      files: ['<%= comConfig.source %>/js/*.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');


  // By default, lint and run all tests.
  grunt.registerTask('default', ['ngcom']);

};
