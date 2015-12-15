module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  	 
     //Concat
     concat: {
      options: {
        separator: '\n\n-----------------------------------------------------\n\n',
        banner: '\n\n-----------------------------------------------------\n\n'
      },
      dist: {
        src: ['components/scripts/*.js'],
        dest: 'builds/development/js/script.js',
      },
      prod: {
        src: ['components/scripts/*.js'],
        dest: 'builds/production/js/script.js',
      }
    },

    //bower_concat
    bower_concat: {
      all: {
        dest: 'builds/development/js/_bower.js',
        cssDest: 'builds/development/css/_bower.css'
      }
    },

    //Sass
    concat: {
      dist:{
        options: {
          style: 'expanded'
        },
        files: {
          'builds/development/css/style.css' : 'components/sass/style.scss'
        }
      },
      prod:{
        options: {
          style: 'compressed'
        },
        files: {
          'builds/production/css/style.css' : 'components/sass/style.scss'
        }
      }
    },

    wiredep: {
      task: {
        src: ['builds/development/**/*.html'
        ]
      }
    },

    //Connect
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9001,
          base: 'builds/development',
          livereload: true
        }
      }
    },

    //Watch
    watch: {
      options: {
      spawn: false,
      livereload: true
    },
      scripts: {
        files: ['builds/development/**/*.html', 
        'components/scripts/**/*.js',
        'components/sass/**/*.scss'],
        tasks: ['concat:dist', 'sass:dist']
      }
    }   
  });

  // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  
  // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks('grunt-sass');

  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Load the plugin that provides the "connect" task.
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Load the plugin that provides the "wiredep" task.
  grunt.loadNpmTasks('grunt-wiredep');

  // Load the plugin that provides the "bower-concat" task.
  grunt.loadNpmTasks('grunt-bower-concat');
  
  // Default task(s).
  grunt.registerTask('default', ['wiredep', 'bower_concat', 'concat:dist', 'sass:dist', 'connect', 'watch']);

};
