var express = require("express"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	request = require("request"),
	app = express();

var favorites = [];

// to read ejs 
app.set("view engine", "ejs");

// to parse info
app.use(bodyParser.urlencoded());

app.get('/', function(req, res){
  res.render('index');
});

// request omdb server
app.get('/search', function(req, res) {
	var query = req.query.searchTerm;
	var url = "http://www.omdbapi.com?s=" + query;
	request(url, function(error, response, body) {
		if(!error) {
			var data = JSON.parse(body);
			res.render("results", {movieList: data.Search || []}); 
		}
	}); 
});

app.get('/search/movie/:id', function(req, res) { 
	var query = req.params.id;
	var url = "http://www.omdbapi.com?i=" + query;
	request(url, function(error, response, body) {
		var data = JSON.parse(body); 
		res.render("detail", {detailList: data || []});
	});
});

app.get('/watch_later/', function(req, res) {
	res.render("watch_later", {movies: favorites}); 
});


// listener
app.listen(3000, function() {
	console.log("Server listening on localhost:3000");
});
