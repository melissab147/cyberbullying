var monk = require('monk');
var db = monk('localhost:27017/cyberbullying');

module.exports = db;
