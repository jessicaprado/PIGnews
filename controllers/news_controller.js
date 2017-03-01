//required modules
var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
//required js files
var db = require('./../config/connection.js');
var Articles = require('./../models/news.js');
var Comments = require('./../models/comments.js');

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

	.populate('Comment')

	.exec(function(err, doc) {
		res.json(doc);
	})
})

app.post('/addComments', function(req, res){

	//var newComment = new Comments(req.body);
	console.log(req);
	//newComment.save(function(error, doc) {

		//console.log(doc);
		// if(error) {
		// 	console.log(error)
		// } else {
		// 	Comments.find({"id": "req.params.id"}, {'body'})

		// 	.exec(function(err, doc){
		// 		res.redirect('/')
		// 	})
		//}
	//})
});

module.exports = app;