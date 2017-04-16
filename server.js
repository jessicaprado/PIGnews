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


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

app.listen(PORT, function(){
	console.log('I am always listening on PORT ' + PORT)
});

