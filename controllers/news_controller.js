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

	Articles.find({})

	.populate('comment')

	.exec(function(err, articles, doc) {

		console.log(articles);

		res.render('index', {Articles : articles});

	})
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

app.get('/articles/:id', function(req, res){

	Articles.find({})

	.populate('comment')

	.exec(function(err, doc) {
		console.log(doc);
		res.redirect('/');
	})

})

app.post('/submit', function(req, res){

	var text = new Comments(req.body);

	text.save(function(error, doc) {
		if(error) {

			res.send(error)

		} else {
		
			Articles.findOneAndUpdate({}, { $push: { "comment": doc._id} }, { 'new': true}, function(err, doc) {

				if(err) {

					res.send(err)

				} else {
			
					res.redirect('/');
				}	
			});		 			
		}
	});
});

module.exports = app;