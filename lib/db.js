var monk = require('monk');
var db = monk('localhost:27017/cyberbullying');
var CSV = require('../cyberbullying_data.csv');

var initialize = function() {
    var data = db.get('data')
    data.find({}, function(err, docs) {
        if(!docs) {
            var csvData = csvJSON(CSV);
            console.log(csvData)
        }
    })
}

function csvJSON(csv){
 
    var lines=csv.split("\n");
 
    var result = [];
 
    var headers=lines[0].split(",");
 
    for(var i=1;i<lines.length;i++){
   
        var obj = {};
        var currentline=lines[i].split(",");

        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
   
        result.push(obj); 
    }
  
  //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}

module.exports = {
    source: db,
    initialize: initialize
};
