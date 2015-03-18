var db = require('./db.js');

module.exports = function(socket) {
    
    socket.on('connection', function(socket) {
        console.log('a user connection');
        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
    });

    socket.on('survey:yes', function() {
        console.log("Heard yes click");
    } )

    socket.on('survey:no', function() {
        console.log("Heard no click");
    } )

};

