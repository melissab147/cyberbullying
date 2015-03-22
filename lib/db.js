var fs = require('fs');
var monk = require('monk');
var db = monk('localhost:27017/cyberbullying');

var initialize = function() {
    var data = db.get('data');
    data.find({}, function(err, docs) {
        if(err) console.error(err);
        if(!docs.length) {
            console.log("Initializing database...")
            fs.readFile(__dirname +'/../cyberbullying_data.json','utf8', function(err, dataString) {
                var dataArr = JSON.parse(dataString);
                dataArr.forEach(function(item) {
                    item.cyberAggressionCount = 0;
                    item.cyberBullyingCount = 0;
                    data.insert(item, function(err, doc) {
                        if(err) console.error(err);
                    });
                });
            }); 
            console.log("Database initialized")
        }
    });
}

module.exports = {
    initialize: initialize,
    monk: db
};
