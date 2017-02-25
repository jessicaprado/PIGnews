var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var exphbs = require("express-handlebars");

PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
var routes = require('./controllers/news_controller.js');
app.use('/', routes);



//Start of cheerio
app.get('/scrape', function(req, res) {
 	var url = 'https://www.reddit.com/r/UpliftingNews/';

 	request(url, function(err, res, body) {
 		var $ = cheerio.load(body);
		var result = {};
 		$('p.title').each(function(i, element){
 			var title = $(this).text();
 			var link = $(element).children().attr('href');
 		})

 		var entry = new Article(result); //ARTICLE is mongoose model exports
 			entry.save(function(err, doc){
 				if (err) {
 					console.log(err)
 				} else {
 					console.log(doc)
 				}
 		})
 	})
 })

app.listen(PORT, function(){
	console.log('I am listening on PORT ' + PORT)
});

// listen to last 30 minutes of class!!!