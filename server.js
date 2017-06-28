//server for homework 13 - the matching page

var express = require("express");
var bodyParser = require ("body-parser");
var path = require ("path");
var app = express();
var PORT = 3000;

// set up express parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var users = require("./app/data/friends.json");
var matchtotal = 0;
var user = {
	name: "testname",
	pic: "link to pic",
	traits:[]
};

var bestMatch = {
	name: "",
	score: 0
}

// for (i=0; i<users.length; i++){
// 	console.log(users[i].name + users[i].photo + users[i].scores);
// }

//  Routes
//  Basic routes for pages
app.get("/", function(req, res){
	res.sendFile(path.join(__dirname, "/app/public/index.html"));
});

app.get("/matching", function(req, res){
	console.log("got the matching page request");
	res.sendFile(path.join(__dirname, "/app/public/matching.html"));
});

app.get("/style", function(req, res){
	console.log("got the css request");
	res.sendFile(path.join(__dirname, "/app/public/style.css"));
});

// routes for data

app.post("/api/search", function(req, res){
	console.log("got the search");
	user = req.body;
	console.log(user);
	for (i=0; i<users.length; i++){
		matchtotal = 0;
		for (a=0; a<user.traits.length; a++){
			matchtotal = matchtotal + (Math.abs(parseInt(user.traits[a]) - parseInt(users[i].scores[a])));
		};
		if (bestMatch.score < matchtotal) {
			bestMatch.score = matchtotal;
			bestMatch.name = users[i].name;
			bestMatch.pic = users[i].photo;
		}
	}
	app.get("/matching.html/usermatch", function(req, res){
		res.send(bestMatch);
	});
});

app.get("/api/list", function(req, res){
	console.log("got the request for the list");
	res.sendFile(path.join(__dirname, "./app/data/friends.json"));
})


app.listen(PORT, function(){
	console.log("listening on port " + PORT);
});