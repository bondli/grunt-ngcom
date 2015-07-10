/*
 * grunt-ngcom
 * https://github.com/bondli/grunt-ngcom
 *
 * Copyright (c) 2015 bondli
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('ngcom', 'generator angular components by component.json', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '',
      separator: "\n"
    });

    var outputFile = options.target + '/ui.star.js';

    var in_array = function(search, array){
        for(var i in array){
            if(array[i] == search){
                return true;
            }
        }
        return false;
    }

    var dependencies = options.dependencies;
    var youchiose = options.filters;

    var allArr = [];

    var prefixStr = 'angular.module("ui.star", [';
    var suffixStr = ']);';

    var baseFileStr = '';
    for(var i in dependencies){
      baseFileStr += '"ui.star.'+ dependencies[i] +'",';
      allArr.push(dependencies[i].toLowerCase());
    }

    for(var i in youchiose){
      baseFileStr += '"ui.star.'+ youchiose[i] +'",';
      allArr.push(youchiose[i].toLowerCase());
    }

    baseFileStr = prefixStr + baseFileStr.substring(0, baseFileStr.length-1) + suffixStr + "\n";

    var src = '';
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          //grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          var filename = filepath.substring(filepath.lastIndexOf('/')+1,filepath.indexOf('.'));

          if( in_array(filename, allArr) ){
            return true;
          }
          return false;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;
      
      // Write the destination file.
      grunt.file.write(outputFile, baseFileStr + src);
      // Print a success message.
      //grunt.log.writeln('File "' + f.dest + '" created.');
    });

  });

};
