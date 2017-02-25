var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/PIGnews');
var db = mongoose.connection;

db.on('error', function(error){
	console.log(error)
});

db.once('open', function(){
	console.log("DB connected")
});

module.exports = db;