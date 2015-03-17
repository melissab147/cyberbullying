var db = require('./db.js');
var FeedParser = require('feedparser');
var request = require('request'); 
var uuid = require('node-uuid');


module.exports = function(socket) {
    
    socket.on('connection', function(socket, id) {
        console.log('a user connection');
        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
    });


};

