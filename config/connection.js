var mongoose = require('mongoose');
var connection;

mongoose.createConnection('your connection string'),
    MyModel = conn.model('ModelName', schema),
    m = new MyModel;
m.save(); // works 

module.exports = connection;