/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      js: {
        src: ['src/js/*.js'],
        dest: 'build/<%= pkg.name %>.js'
      },
      css: {
        src: ['src/css/reset.css', 'src/css/main.css'],
        dest: 'build/<%= pkg.name %>.css'
      },
      html: {
        files: {
          'build/index.html': ['src/html/index.html'],
          'build/google9e48730d398c5fee.html': ['src/html/google9e48730d398c5fee.html'],
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.js.dest %>',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      html: {
        files: ['<%= concat.html.src %>'],
        tasks: ['concat:html']
      },
      css: {
        files: ['<%= concat.css.src %>'],
        tasks: ['concat:css']
      },
      js: {
        files: ['<%= concat.js.src %>'],
        tasks: ['concat:js']
      }
    },
    copy: {
      main: {
        files: [
          // flattens results to a single level
          {expand: true, flatten: true, src: ['src/images/**'], dest: 'build/', filter: 'isFile'}
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['concat', 'copy']);
  grunt.registerTask('build', ['concat', 'uglify', 'copy']);
};
