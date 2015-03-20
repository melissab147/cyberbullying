var db = require('./db.js');
var fs = require('fs');

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
    
    socket.on('comments', function() {
        console.log("Heard comment click");
    } )    

    socket.on('next', function() {
        console.log("Heard next click");
    } )    

    socket.on('data:retrieve', function() {
        fs.readFile(__dirname +'/../cyberbullying_data.json', function(err, data) {
            var obj = JSON.parse(data);
            socket.emit('data:send', obj) 
        }) 
    })
};

