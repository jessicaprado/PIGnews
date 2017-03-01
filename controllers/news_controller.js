//required modules
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

//required js files
var db = require('./../config/connection.js');
var Articles = require('./../models/news.js');
var Comments = require('./../models/comments.js');
var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//ROUTES

//default route. Displays scraped Data
app.get('/', function(req, res) {

	Articles.find({}, function(err, articles, doc) {

		res.render('index', {Articles : articles});

	}).limit(10); //limits to 10 per page
})

// scrapes data from website when "MORE PIG NEWS" button is selected
app.get('/scrape', function(req, res) {
	//Start of cheerio
 	var url = 'http://www.goodnewsnetwork.org/uplift/inspiring/';

 	request(url, function(err, res, body) {

 		var $ = cheerio.load(body);
		
 		$('.td_mod2').each(function(i, element){
 			
 		 	var result = {};

 		 	result.title = $(this).children("h3.entry-title").children("a").text();

 		 	result.link = $(this).children("h3.entry-title").children("a").attr('href');
			
			result.image = $(this).children(".thumb-wrap").children('a').children("img").attr('src');
 		 	
 		 	console.log("Title: " + result.image);

 		 	var entry = new Articles(result);
			
 		 	entry.save(function(err, doc){
 		 		if (err) {
 		 			console.log(err)
 				} else {
 		 			console.log(doc)
 		 		}
			 })
 		})
 	})
 	res.redirect('/');
 })

app.get('/article/:id', function(req, res){

	Article.find({"id": req.params.id})

	.populate('comment')

	.exec(function(err, doc) {
		res.json(doc);
	})
})

app.post('/articles/:id', function(req, res){

	var text = new Comments(req.body);

	text.save(function(error, doc) {
		
		Articles.findOneAndUpdate({"_id" : req.params.id}, {"comment" : doc.id}) 

		.exec(function(err, doc) {
			
		res.send(doc);	
		})		 			
	})
});

module.exports = app;