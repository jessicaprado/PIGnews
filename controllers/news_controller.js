var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var db = require('./../config/connection.js');

var Articles = require('./../models/news.js');
var Comments = require('./../models/comments.js');

app.get('/', function(req, res) {
	Articles.find(function(err, articles, doc) {
		res.render('index', {Articles : articles});
	}).limit(5);
})

//Start of cheerio
app.get('/scrape', function(req, res) {

 	var url = 'https://www.reddit.com/r/UpliftingNews/';

 	request(url, function(err, res, body) {

 		var $ = cheerio.load(body);
		
 		$('p.title').each(function(i, element){
 			
 		 	var result = {};

 		 	result.title = $(this).children("a").text();

 		 	result.link = $(this).children().attr('href');
			
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
 })

module.exports = app;