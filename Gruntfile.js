module.exports = function(grunt) {
    grunt.initConfig({
        convert: {
            csv2json: { 
                src: ['./cyberbullying_data.csv'],
                dest: './cyberbullying_data.json'
            }
        }
    })

    grunt.loadNpmTasks('grunt-convert');

    grunt.registerTask('default', ['convert']);
}
