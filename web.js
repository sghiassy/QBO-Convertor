var ONEDAY = 86400000;

var express = require("express");
var app = express();
app.use(express.logger());

app.get('/test', function(request, response) {
  response.send('Hello World from Heroku');
});

app.use('/', express.static(__dirname + '/build'), {maxAge: ONEDAY});

var port = process.env.PORT || 9000;

app.listen(port, function() {
	console.log("Listening on " + port);
});