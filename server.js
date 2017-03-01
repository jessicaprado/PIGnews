var express = require('express');
var app = express();
var exphbs = require("express-handlebars");

var Articles = require('./models/news.js');
var Comments = require('./models/comments.js');
var routes = require('./controllers/news_controller.js');
var db = require('./config/connection.js');
var bodyParser = require('body-parser')

PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use('/', routes);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.listen(PORT, function(){
	console.log('I am listening on PORT ' + PORT)
});

