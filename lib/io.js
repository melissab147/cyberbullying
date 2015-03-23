var db = require('./db.js');
var fs = require('fs');

var dataForSocket = {};
var data;


var getData = function() {
    var dataColl = db.monk.get('data');
    dataColl.find({}, function(err, docs) {
        data = docs;
        console.log("Retrieved data from database")
    })
}

module.exports = function(socket) {

    console.log('a user connection from ' + socket.id);
    if(!data) getData();
    dataForSocket[socket.id] = 0;
    
    socket.on('disconnect', function() {
        console.log('user disconnected');
        delete dataForSocket[socket.id];
    });

    socket.on('survey:next', function(results) {
        var dataColl = db.monk.get('data');
        var dataIdx = dataForSocket[socket.id];
        var doc = data[dataIdx];

        console.log(results)

        if(results.bullying && results.aggression) {
            dataColl.update(doc, {$inc: {cyberBullyingCount: 1, cyberAggressionCount: 1}})
        } else if(results.bullying) {
            dataColl.update(doc, {$inc: {cyberBullyingCount: 1}})
        } else if(results.aggression) {
            dataColl.update(doc, {$inc: {cyberAggressionCount: 1}})
        } 

        getData();

        dataIdx++;
        dataForSocket[socket.id] = dataIdx;
        doc = data[dataIdx];

        socket.emit('data:send', doc);
    })    

    socket.on('data:retrieve', function() {
        var dataIdx = dataForSocket[socket.id];
        var doc = data[dataIdx];
        socket.emit('data:send', doc);
    })
};

